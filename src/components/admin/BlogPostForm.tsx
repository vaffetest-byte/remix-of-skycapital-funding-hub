import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { BlogPost, BlogPostInsert } from '@/types/blog';
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setFeaturedImageUrl(post.featured_image_url || '');
      setImagePreview(post.featured_image_url || null);
      setFundingAmount(post.funding_amount?.toString() || '');
      setCompanyName(post.company_name);
      setDealDate(post.deal_date || '');
      setPublished(post.published);
    }
  }, [post]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a JPG, PNG, WebP, or GIF image.',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `business-images/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setFeaturedImageUrl(publicUrl);
      setImagePreview(publicUrl);

      toast({
        title: 'Image uploaded',
        description: 'Business image uploaded successfully!',
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setFeaturedImageUrl('');
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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

      {/* Image Upload Section */}
      <div className="space-y-3">
        <Label>Business Image</Label>
        
        {imagePreview ? (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-w-md h-48 object-cover rounded-lg border border-border"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={handleRemoveImage}
              disabled={isLoading || uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Click to upload business image</p>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG, WebP or GIF (max 5MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageUpload}
          className="hidden"
          disabled={isLoading || uploading}
        />

        {/* Optional URL input */}
        <div className="space-y-2">
          <Label htmlFor="featuredImageUrl" className="text-sm text-muted-foreground">
            Or enter image URL directly
          </Label>
          <Input
            id="featuredImageUrl"
            type="url"
            value={featuredImageUrl}
            onChange={(e) => {
              setFeaturedImageUrl(e.target.value);
              setImagePreview(e.target.value || null);
            }}
            placeholder="https://example.com/image.jpg"
            disabled={isLoading || uploading}
          />
        </div>
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
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading || uploading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || uploading}>
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
