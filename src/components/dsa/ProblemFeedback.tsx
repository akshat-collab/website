import { useState, useEffect, useCallback } from 'react';
import { useDsaAuth } from '@/features/dsa/auth/DsaAuthContext';
import { Button } from '@/components/ui/button';

/** Get effective user: DSA login, main site login (techmasterai_user), or null for guest */
function useEffectiveUser(): { id: string; username: string; email?: string } | null {
  const { user: dsaUser } = useDsaAuth();
  const [mainUser, setMainUser] = useState<{ name: string; email: string } | null>(null);

  const readMainUser = useCallback(() => {
    const raw = localStorage.getItem('techmasterai_user');
    if (!raw) {
      setMainUser(null);
      return;
    }
    try {
      const parsed = JSON.parse(raw) as { name?: string; email?: string };
      if (parsed?.email)
        setMainUser({ name: parsed.name ?? parsed.email ?? 'User', email: parsed.email });
      else setMainUser(null);
    } catch {
      setMainUser(null);
    }
  }, []);

  useEffect(() => {
    readMainUser();
    window.addEventListener('storage', readMainUser);
    return () => window.removeEventListener('storage', readMainUser);
  }, [readMainUser]);

  if (dsaUser) return { id: dsaUser.id, username: dsaUser.username, email: dsaUser.email };
  if (mainUser) return { id: mainUser.email, username: mainUser.name, email: mainUser.email };
  return null;
}
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

const COMMENTS_KEY = (slug: string) => `dsa_comments_${slug}`;

interface Comment {
  id: string;
  problem_slug: string;
  user_id: string;
  username: string;
  user_avatar?: string;
  content: string;
  parent_comment_id?: string;
  likes: number;
  liked_by: string[];
  created_at: string;
  updated_at: string;
  replies?: Comment[];
  isLiked?: boolean;
}

interface ProblemFeedbackProps {
  problemSlug: string;
  onCommentCountChange?: (count: number) => void;
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

function loadCommentsFromStorage(slug: string): Comment[] {
  try {
    const raw = localStorage.getItem(COMMENTS_KEY(slug));
    if (!raw) return [];
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return [];
    return arr.map((c: Record<string, unknown>) => ({
      ...c,
      liked_by: Array.isArray(c.liked_by) ? c.liked_by : [],
      likes: Array.isArray(c.liked_by) ? c.liked_by.length : Number(c.likes) || 0,
    })) as Comment[];
  } catch {
    return [];
  }
}

function saveCommentsToStorage(slug: string, comments: Comment[]): void {
  localStorage.setItem(COMMENTS_KEY(slug), JSON.stringify(comments));
}

export function ProblemFeedback({ problemSlug, onCommentCountChange }: ProblemFeedbackProps) {
  const currentUser = useEffectiveUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [hasNewComments, setHasNewComments] = useState(false);
  const [lastViewedTime, setLastViewedTime] = useState<Date>(new Date());

  const fetchComments = useCallback(() => {
    setLoading(true);
    const rows = loadCommentsFromStorage(problemSlug);
    const userLikes: string[] = currentUser?.id
      ? rows.filter((c) => c.liked_by?.includes(currentUser.id)).map((c) => c.id)
      : [];
    const roots = buildCommentTree(rows, userLikes);
    const sorted =
      sortBy === 'popular'
        ? roots.sort((a, b) => b.likes - a.likes)
        : roots.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setHasNewComments(sorted.some((c) => new Date(c.created_at) > lastViewedTime));
    setComments(sorted);
    onCommentCountChange?.(rows.length);
    setLoading(false);
  }, [problemSlug, currentUser?.id, sortBy, lastViewedTime, onCommentCountChange]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLastViewedTime(new Date());
      setHasNewComments(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [comments]);

  const handlePostComment = async () => {
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    try {
      setSubmitting(true);
      const rows = loadCommentsFromStorage(problemSlug);
      const userId = currentUser?.id ?? `guest_${Date.now()}`;
      const username = currentUser?.username || currentUser?.email?.split('@')[0] || 'Guest';
      const comment: Comment = {
        id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        problem_slug: problemSlug,
        user_id: userId,
        username,
        user_avatar: undefined,
        content: newComment.trim(),
        liked_by: [],
        likes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      rows.push(comment);
      saveCommentsToStorage(problemSlug, rows);
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
    if (!replyContent.trim()) return;
    try {
      setSubmitting(true);
      const rows = loadCommentsFromStorage(problemSlug);
      const userId = currentUser?.id ?? `guest_${Date.now()}`;
      const username = currentUser?.username || currentUser?.email?.split('@')[0] || 'Guest';
      const reply: Comment = {
        id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        problem_slug: problemSlug,
        user_id: userId,
        username,
        user_avatar: undefined,
        content: replyContent.trim(),
        parent_comment_id: parentId,
        liked_by: [],
        likes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      rows.push(reply);
      saveCommentsToStorage(problemSlug, rows);
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
      toast.error('Login to like comments');
      return;
    }
    try {
      const rows = loadCommentsFromStorage(problemSlug);
      const comment = rows.find((c) => c.id === commentId);
      if (!comment) return;
      const liked_by = comment.liked_by || [];
      const next = isLiked
        ? liked_by.filter((id) => id !== currentUser.id)
        : [...liked_by, currentUser.id];
      comment.liked_by = next;
      comment.likes = next.length;
      comment.updated_at = new Date().toISOString();
      saveCommentsToStorage(problemSlug, rows);
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
            placeholder="Share your feedback or ask a question..."
            className="min-h-[100px] bg-[#1a1f2e] border-white/20 text-white placeholder:text-slate-500 resize-none"
          />
          <div className="flex justify-end">
            <Button
              onClick={handlePostComment}
              disabled={submitting || !newComment.trim()}
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
