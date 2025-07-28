import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { MessageSquare, Calendar, User, Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Mock data - will be replaced with Supabase data
const mockArticles = [
  {
    id: "1",
    title: "تقنيات المذاكرة الفعالة: دليل شامل للطلاب العرب",
    content: "في هذا المقال، سنستكشف أفضل التقنيات والطرق المثبتة علمياً للمذاكرة الفعالة...",
    cover_image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
    author: "المعافر",
    published: true,
    created_at: "2024-01-15",
    comments_count: 12
  },
  {
    id: "2", 
    title: "كيفية إدارة الوقت أثناء فترة الامتحانات",
    content: "إدارة الوقت من أهم المهارات التي يحتاجها كل طالب، خاصة في فترة الامتحانات...",
    cover_image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    author: "المعافر",
    published: true,
    created_at: "2024-01-10",
    comments_count: 8
  },
  {
    id: "3",
    title: "تقنية البومودورو: المفهوم والتطبيق العملي",
    content: "تقنية البومودورو واحدة من أكثر التقنيات فعالية لزيادة التركيز والإنتاجية...",
    cover_image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500",
    author: "المعافر", 
    published: true,
    created_at: "2024-01-05",
    comments_count: 15
  }
];

const Articles = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const { toast } = useToast();

  // Check auth state and load articles
  useEffect(() => {
    const loadData = async () => {
      // Check auth
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      // Load articles
      const { data: articlesData, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading articles:', error);
        setArticles(mockArticles); // Fallback to mock data
      } else {
        setArticles(articlesData || []);
      }
      setLoading(false);
    };

    loadData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Mock comments for selected article
  const mockComments = [
    {
      id: "1",
      content: "مقال رائع ومفيد جداً، شكراً لك أخي المعافر على هذا المحتوى القيم",
      user: { display_name: "أحمد محمد" },
      created_at: "2024-01-16T10:00:00Z",
      approved: true
    },
    {
      id: "2", 
      content: "هل يمكنك كتابة مقال عن تقنيات الحفظ؟ أعاني من صعوبة في حفظ المعلومات",
      user: { display_name: "فاطمة علي" },
      created_at: "2024-01-16T11:30:00Z",
      approved: true
    }
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleArticleClick = async (article: any) => {
    setSelectedArticle(article);
    
    // Load comments for this article
    const { data: commentsData, error } = await supabase
      .from('comments')
      .select('*')
      .eq('article_id', article.id)
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading comments:', error);
      setComments(mockComments); // Fallback
    } else {
      const processedComments = commentsData?.map(comment => ({
        ...comment,
        user: { display_name: 'مستخدم' }
      })) || [];
      setComments(processedComments);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() && user && selectedArticle) {
      try {
        const { error } = await supabase
          .from('comments')
          .insert({
            article_id: selectedArticle.id,
            user_id: user.id,
            content: comment,
            approved: false // Requires admin approval
          });

        if (error) {
          toast({
            title: "خطأ",
            description: "لم يتم إرسال التعليق",
            variant: "destructive",
          });
        } else {
          toast({
            title: "تم الإرسال",
            description: "تعليقك في انتظار الموافقة",
          });
          setComment("");
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    } else if (!user) {
      toast({
        title: "تسجيل الدخول مطلوب",
        description: "يجب تسجيل الدخول لإضافة تعليق",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  if (selectedArticle) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button 
              onClick={() => setSelectedArticle(null)}
              variant="outline" 
              className="mb-6 gap-2"
            >
              ← العودة للمقالات
            </Button>

            {/* Article Header */}
            <div className="mb-8">
              {selectedArticle.cover_image_url && (
                <img 
                  src={selectedArticle.cover_image_url}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <h1 className="text-3xl md:text-4xl font-title font-bold mb-4 text-foreground">
                {selectedArticle.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{selectedArticle.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(selectedArticle.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>{comments.length} تعليق</span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none text-foreground leading-relaxed">
                  <p>{selectedArticle.content}</p>
                  <p>
                    هذا نص تجريبي للمقال. في التطبيق الحقيقي، سيتم عرض المحتوى الكامل للمقال من قاعدة البيانات.
                    يمكن أن يحتوي المقال على عدة فقرات وصور وقوائم وغيرها من عناصر التنسيق.
                  </p>
                  <p>
                    نحن في المعافر نؤمن بأهمية المحتوى العلمي المفيد والمتميز. لذلك نحرص على تقديم مقالات 
                    عالية الجودة تساعد الطلاب على تطوير مهاراتهم الدراسية وتحقيق أهدافهم الأكاديمية.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  التعليقات ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Comment Form */}
                <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium mb-3">اترك تعليقاً</h3>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="شاركنا رأيك أو أسئلتك حول المقال..."
                    className="mb-3"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleCommentSubmit} className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      إرسال التعليق
                    </Button>
                    <p className="text-sm text-muted-foreground flex items-center">
                      * التعليقات تحتاج موافقة المشرف قبل النشر
                    </p>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-accent" />
                          </div>
                          <span className="font-medium">{comment.user.display_name}</span>
                          {!comment.approved && (
                            <Badge variant="secondary" className="text-xs">
                              في انتظار الموافقة
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-foreground">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-title font-bold mb-4 text-foreground">
            مقالات المعافر
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            مجموعة مختارة من المقالات التعليمية والنصائح الدراسية لمساعدتك في رحلتك الأكاديمية
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المقالات..."
              className="pr-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            تصنيف
          </Button>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <div onClick={() => handleArticleClick(article)}>
                {article.cover_image_url && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={article.cover_image_url}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg font-title line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {article.content}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(article.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{article.comments_count}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">لا توجد مقالات</h3>
            <p className="text-muted-foreground">لم نجد أي مقالات تطابق بحثك</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-12 p-8 bg-accent/5 rounded-lg border border-accent/20">
          <h2 className="text-2xl font-title font-bold mb-4 text-foreground">
            هل لديك اقتراح لمقال جديد؟
          </h2>
          <p className="text-muted-foreground mb-6">
            شاركنا أفكارك واقتراحاتك للمواضيع التي تود قراءتها
          </p>
          <Button className="gap-2">
            <MessageSquare className="h-4 w-4" />
            اقترح موضوعاً
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Articles;