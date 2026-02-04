import { Link } from 'react-router-dom';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, DollarSign, Building2, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

function formatCurrency(amount: number) {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

function BlogPostCard({ post }: { post: any }) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
      {post.featured_image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-2">
          {post.funding_amount && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {formatCurrency(post.funding_amount)}
            </Badge>
          )}
          {post.deal_date && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(post.deal_date), 'MMM yyyy')}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl font-heading line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Building2 className="h-4 w-4" />
          <span>{post.company_name}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{post.content}</p>
      </CardContent>
    </Card>
  );
}

function BlogSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardHeader className="pb-3">
        <div className="flex gap-2 mb-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mt-2" />
      </CardContent>
    </Card>
  );
}

export default function Blog() {
  const { data: posts, isLoading, error } = useBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground py-16 md:py-24">
        <div className="container">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Funding Deals
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Explore our successful funding deals and see how we've helped businesses secure the capital they need to grow.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container py-12 md:py-16">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load blog posts. Please try again later.</p>
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No funding deals published yet. Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}
