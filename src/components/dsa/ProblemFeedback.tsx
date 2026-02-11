import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useDsaAuth } from '@/features/dsa/auth/DsaAuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  ThumbsUp,
  Reply,
  Send,
  Loader2,
  User,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  problem_slug: string;
  user_id: string;
  username: string;
  user_avatar?: string;
  content: string;
  parent_comment_id?: string;
  likes: number;
  created_at: string;
  updated_at: string;
  replies?: Comment[];
  isLiked?: boolean;
}

interface ProblemFeedbackProps {
  problemSlug: string;
}

function buildCommentTree(rows: Comment[], userLikes: string[]): Comment[] {
  const commentMap = new Map<string, Comment>();
  rows.forEach((c) => {
    commentMap.set(c.id, {
      ...c,
      replies: [],
      isLiked: userLikes.includes(c.id),
    });
  });
  const roots: Comment[] = [];
  commentMap.forEach((c) => {
    if (c.parent_comment_id) {
      const parent = commentMap.get(c.parent_comment_id);
      if (parent) {
        parent.replies = parent.replies || [];
        parent.replies.push(c);
      }
    } else {
      roots.push(c);
    }
  });
  return roots;
}

export function ProblemFeedback({ problemSlug }: ProblemFeedbackProps) {
  const { user: currentUser } = useDsaAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [hasNewComments, setHasNewComments] = useState(false);
  const [lastViewedTime, setLastViewedTime] = useState<Date>(new Date());

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const { data: commentsData, error: commentsErr } = await supabase
        .from('problem_comments')
        .select('id, problem_slug, user_id, username, user_avatar, content, parent_comment_id, likes, created_at, updated_at')
        .eq('problem_slug', problemSlug)
        .order('created_at', { ascending: true });

      if (commentsErr) throw commentsErr;

      let userLikes: string[] = [];
      if (currentUser?.id) {
        const commentIds = (commentsData || []).map((c) => c.id);
        if (commentIds.length > 0) {
          const { data: likesData } = await supabase
            .from('comment_likes')
            .select('comment_id')
            .eq('user_id', currentUser.id)
            .in('comment_id', commentIds);
          userLikes = (likesData || []).map((l) => l.comment_id);
        }
      }

      const rows = (commentsData || []).map((r) => ({
        ...r,
        created_at: r.created_at,
        updated_at: r.updated_at,
      })) as Comment[];
      const roots = buildCommentTree(rows, userLikes);
      const sorted =
        sortBy === 'popular'
          ? roots.sort((a, b) => b.likes - a.likes)
          : roots.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setHasNewComments(sorted.some((c) => new Date(c.created_at) > lastViewedTime));
      setComments(sorted);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  }, [problemSlug, currentUser?.id, sortBy, lastViewedTime]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Realtime: subscribe to problem_comments changes for this problem
  useEffect(() => {
    const channel = supabase
      .channel(`problem_comments:${problemSlug}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'problem_comments',
          filter: `problem_slug=eq.${problemSlug}`,
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [problemSlug, fetchComments]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLastViewedTime(new Date());
      setHasNewComments(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [comments]);

  const handlePostComment = async () => {
    if (!currentUser) {
      toast.error('Please login to comment');
      return;
    }
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    try {
      setSubmitting(true);
      const { error } = await supabase.from('problem_comments').insert({
        problem_slug: problemSlug,
        user_id: currentUser.id,
        username: currentUser.username || currentUser.email?.split('@')[0] || 'User',
        user_avatar: null,
        content: newComment.trim(),
      });
      if (error) throw error;
      setNewComment('');
      toast.success('Feedback posted!');
      fetchComments();
    } catch (error) {
      toast.error('Failed to post feedback');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePostReply = async (parentId: string) => {
    if (!currentUser) {
      toast.error('Please login to reply');
      return;
    }
    if (!replyContent.trim()) return;
    try {
      setSubmitting(true);
      const { error } = await supabase.from('problem_comments').insert({
        problem_slug: problemSlug,
        user_id: currentUser.id,
        username: currentUser.username || currentUser.email?.split('@')[0] || 'User',
        user_avatar: null,
        content: replyContent.trim(),
        parent_comment_id: parentId,
      });
      if (error) throw error;
      setReplyContent('');
      setReplyTo(null);
      toast.success('Reply posted!');
      fetchComments();
    } catch (error) {
      toast.error('Failed to post reply');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleLike = async (commentId: string, isLiked: boolean) => {
    if (!currentUser) {
      toast.error('Please login to like comments');
      return;
    }
    try {
      if (isLiked) {
        await supabase
          .from('comment_likes')
          .delete()
          .eq('comment_id', commentId)
          .eq('user_id', currentUser.id);
      } else {
        await supabase.from('comment_likes').insert({
          comment_id: commentId,
          user_id: currentUser.id,
        });
      }
      fetchComments();
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-12 mt-3' : 'mb-4'}`}>
      <div className="bg-[#1a1f2e] rounded-xl p-4 border border-white/10">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.user_avatar} />
            <AvatarFallback className="bg-cyan-500/20 text-cyan-400">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-white text-sm">{comment.username}</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 ml-11">
          <button
            onClick={() => handleToggleLike(comment.id, comment.isLiked || false)}
            className={`flex items-center gap-1.5 text-xs transition-colors ${
              comment.isLiked ? 'text-cyan-400' : 'text-slate-400 hover:text-cyan-400'
            }`}
          >
            <ThumbsUp className={`h-3.5 w-3.5 ${comment.isLiked ? 'fill-current' : ''}`} />
            <span>{comment.likes}</span>
          </button>
          {!isReply && (
            <button
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Reply className="h-3.5 w-3.5" />
              <span>Reply</span>
            </button>
          )}
        </div>
        {replyTo === comment.id && (
          <div className="mt-3 ml-11">
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="min-h-[80px] bg-[#0B0F19] border-white/20 text-white resize-none"
            />
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                onClick={() => handlePostReply(comment.id)}
                disabled={submitting || !replyContent.trim()}
                className="bg-cyan-500 hover:bg-cyan-400 text-black"
              >
                {submitting ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Post Reply'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setReplyTo(null);
                  setReplyContent('');
                }}
                className="border-white/20"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3">
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col bg-transparent mt-6 pt-6 border-t border-white/10 problem-feedback">
      <div className="shrink-0 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Feedback</h3>
            <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400">
              {comments.length}
            </Badge>
            {hasNewComments && (
              <Badge className="bg-green-500 text-white animate-pulse">New</Badge>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('newest')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                sortBy === 'newest'
                  ? 'bg-cyan-500 text-black'
                  : 'bg-white/10 text-slate-400 hover:bg-white/20'
              }`}
            >
              <Clock className="h-3 w-3 inline mr-1" />
              Newest
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                sortBy === 'popular'
                  ? 'bg-cyan-500 text-black'
                  : 'bg-white/10 text-slate-400 hover:bg-white/20'
              }`}
            >
              <TrendingUp className="h-3 w-3 inline mr-1" />
              Popular
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={
              currentUser ? 'Share your feedback or ask a question...' : 'Login to comment'
            }
            disabled={!currentUser}
            className="min-h-[100px] bg-[#1a1f2e] border-white/20 text-white placeholder:text-slate-500 resize-none"
          />
          <div className="flex justify-end">
            <Button
              onClick={handlePostComment}
              disabled={submitting || !newComment.trim() || !currentUser}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Post Feedback
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No feedback yet</p>
            <p className="text-slate-500 text-xs mt-1">Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div>{comments.map((comment) => renderComment(comment))}</div>
        )}
      </div>
    </div>
  );
}
