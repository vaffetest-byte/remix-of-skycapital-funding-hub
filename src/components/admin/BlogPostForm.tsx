import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { BlogPost, BlogPostInsert } from '@/types/blog';
import { Loader2 } from 'lucide-react';

interface BlogPostFormProps {
  post?: BlogPost | null;
  onSubmit: (data: BlogPostInsert) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function BlogPostForm({ post, onSubmit, onCancel, isLoading }: BlogPostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [fundingAmount, setFundingAmount] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [dealDate, setDealDate] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setFeaturedImageUrl(post.featured_image_url || '');
      setFundingAmount(post.funding_amount?.toString() || '');
      setCompanyName(post.company_name);
      setDealDate(post.deal_date || '');
      setPublished(post.published);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      title,
      content,
      featured_image_url: featuredImageUrl || null,
      funding_amount: fundingAmount ? parseFloat(fundingAmount) : null,
      company_name: companyName,
      deal_date: dealDate || null,
      published,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Deal announcement title"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company name"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fundingAmount">Funding Amount ($)</Label>
          <Input
            id="fundingAmount"
            type="number"
            value={fundingAmount}
            onChange={(e) => setFundingAmount(e.target.value)}
            placeholder="e.g., 500000"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dealDate">Deal Date</Label>
          <Input
            id="dealDate"
            type="date"
            value={dealDate}
            onChange={(e) => setDealDate(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="featuredImageUrl">Featured Image URL</Label>
        <Input
          id="featuredImageUrl"
          type="url"
          value={featuredImageUrl}
          onChange={(e) => setFeaturedImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write about the funding deal..."
          rows={8}
          required
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="published"
          checked={published}
          onCheckedChange={setPublished}
          disabled={isLoading}
        />
        <Label htmlFor="published" className="cursor-pointer">
          Publish immediately
        </Label>
      </div>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            post ? 'Update Post' : 'Create Post'
          )}
        </Button>
      </div>
    </form>
  );
}
