import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { MessageSquare, Calendar, User, Search, Filter, ArrowLeft, Send } from "lucide-react"; // Added ArrowLeft, Send
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Mock data - will be replaced with Supabase data
const mockArticles = [
  {
    id: "1",
    title: "تقنيات المذاكرة الفعالة: دليل شامل للطلاب العرب",
    content: "في هذا المقال، سنستكشف أفضل التقنيات والطرق المثبتة علمياً للمذاكرة الفعالة وكيف يمكن للطلاب العرب تطبيقها لتحقيق أقصى استفادة من وقتهم وجهدهم الدراسي. سنتناول مواضيع مثل التخطيط الجيد، وأساليب القراءة النشطة، وكيفية تلخيص المعلومات بفعالية، بالإضافة إلى نصائح للتعامل مع التوتر والقلق أثناء فترة الامتحانات. هذا الدليل الشامل مصمم لمساعدتك على تحسين أدائك الأكاديمي وتحقيق أهدافك التعليمية.",
    cover_image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80",
    author: "المعافر",
    published: true,
    created_at: "2024-01-15T10:00:00Z",
    comments_count: 12
  },
  {
    id: "2", 
    title: "كيفية إدارة الوقت أثناء فترة الامتحانات بفعالية",
    content: "إدارة الوقت من أهم المهارات التي يحتاجها كل طالب، خاصة في فترة الامتحانات. يقدم هذا المقال استراتيجيات عملية ومجربة لمساعدتك على تنظيم جدولك الدراسي، وتحديد الأولويات، وتجنب التسويف. سنتحدث عن تقنيات مثل تقسيم المهام الكبيرة إلى أجزاء صغيرة، واستخدام أدوات التخطيط، وكيفية تخصيص وقت للراحة لتجنب الإرهاق. تعلم كيف تستغل كل دقيقة بذكاء لتحقيق أفضل النتائج.",
    cover_image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
    author: "المعافر",
    published: true,
    created_at: "2024-01-10T14:30:00Z",
    comments_count: 8
  },
  {
    id: "3",
    title: "تقنية البومودورو: المفهوم والتطبيق العملي لزيادة التركيز",
    content: "تقنية البومودورو واحدة من أكثر التقنيات فعالية لزيادة التركيز والإنتاجية، وهي مثالية للطلاب الذين يعانون من التشتت. يشرح هذا المقال المفهوم الأساسي لهذه التقنية (25 دقيقة عمل، 5 دقائق راحة)، وكيفية تطبيقها خطوة بخطوة. سنتناول أيضًا نصائح لتحقيق أقصى استفادة من جلسات البومودورو، وكيف يمكن تكييفها لتناسب أنماط الدراسة المختلفة. اكتشف كيف يمكن لهذه التقنية البسيطة أن تحدث فرقًا كبيرًا في كفاءتك الدراسية.",
    cover_image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=80",
    author: "المعافر", 
    published: true,
    created_at: "2024-01-05T09:00:00Z",
    comments_count: 15
  },
  {
    id: "4",
    title: "أهمية النوم الكافي للطلاب: كيف يؤثر على الأداء الأكاديمي",
    content: "غالبًا ما يقلل الطلاب من أهمية النوم، لكنه يلعب دورًا حاسمًا في الأداء الأكاديمي والصحة العامة. يستعرض هذا المقال العلاقة بين النوم الجيد والتركيز، الذاكرة، والقدرة على حل المشكلات. سنقدم نصائح عملية لتحسين جودة النوم، مثل تحديد جدول نوم منتظم، تهيئة بيئة النوم، وتجنب المنبهات قبل النوم. استثمر في نومك لتحصد أفضل النتائج في دراستك.",
    cover_image_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
    author: "المعافر",
    published: true,
    created_at: "2023-12-28T11:00:00Z",
    comments_count: 5
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
        setArticles(articlesData || mockArticles); // Use fetched data or mock if empty
      }
      setLoading(false);
    };

    loadData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Mock comments for selected article (for fallback)
  const mockComments = [
    {
      id: "1",
      content: "مقال رائع ومفيد جداً، شكراً لك أخي المعافر على هذا المحتوى القيم. استفدت منه كثيرًا في تنظيم وقتي.",
      user: { display_name: "أحمد محمد" },
      created_at: "2024-01-16T10:00:00Z",
      approved: true
    },
    {
      id: "2", 
      content: "هل يمكنك كتابة مقال عن تقنيات الحفظ؟ أعاني من صعوبة في حفظ المعلومات الطويلة للمواد العلمية.",
      user: { display_name: "فاطمة علي" },
      created_at: "2024-01-16T11:30:00Z",
      approved: true
    },
    {
      id: "3", 
      content: "شكرًا على المقال، هل هناك أي نصائح إضافية للمذاكرة في بيئة صاخبة؟",
      user: { display_name: "يوسف خالد" },
      created_at: "2024-01-17T09:00:00Z",
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
        user: { display_name: 'مستخدم' } // Replace with actual user display name if available
      })) || mockComments; // Use fetched data or mock if empty
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
            description: "لم يتم إرسال التعليق. يرجى المحاولة مرة أخرى.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "تم الإرسال",
            description: "تعليقك في انتظار الموافقة وسيظهر بعد مراجعته.",
          });
          setComment("");
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
        toast({
          title: "خطأ غير متوقع",
          description: "حدث خطأ أثناء إرسال التعليق.",
          variant: "destructive",
        });
      }
    } else if (!user) {
      toast({
        title: "تسجيل الدخول مطلوب",
        description: "يجب تسجيل الدخول لإضافة تعليق.",
        variant: "destructive",
      });
    } else if (!comment.trim()) {
      toast({
        title: "التعليق فارغ",
        description: "الرجاء كتابة تعليق قبل الإرسال.",
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
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button 
              onClick={() => setSelectedArticle(null)}
              variant="outline" 
              className="mb-8 gap-2 text-lg px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300" // Enhanced button
            >
              <ArrowLeft className="h-5 w-5" />
              <span>العودة للمقالات</span>
            </Button>

            {/* Article Header */}
            <div className="mb-10">
              {selectedArticle.cover_image_url && (
                <img 
                  src={selectedArticle.cover_image_url}
                  alt={selectedArticle.title}
                  className="w-full h-72 object-cover rounded-xl mb-6 shadow-lg" // Larger image, rounded, shadow
                />
              )}
              <h1 className="text-4xl md:text-5xl font-title font-bold mb-4 text-foreground leading-tight">
                {selectedArticle.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground text-lg mb-6"> {/* Larger text, better spacing */}
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-accent" /> {/* Accent icon */}
                  <span>{selectedArticle.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" /> {/* Accent icon */}
                  <span>{formatDate(selectedArticle.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-accent" /> {/* Accent icon */}
                  <span>{comments.length} تعليق</span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <Card className="mb-10 shadow-lg border-t-4 border-accent"> {/* Enhanced card */}
              <CardContent className="p-8 md:p-10"> {/* Increased padding */}
                <div className="prose prose-lg max-w-none text-foreground leading-relaxed text-lg"> {/* Larger text */}
                  <p>{selectedArticle.content}</p>
                  <p>
                    هذا نص تجريبي للمقال. في التطبيق الحقيقي، سيتم عرض المحتوى الكامل للمقال من قاعدة البيانات.
                    يمكن أن يحتوي المقال على عدة فقرات وصور وقوائم وغيرها من عناصر التنسيق.
                  </p>
                  <p>
                    نحن في المعافر نؤمن بأهمية المحتوى العلمي المفيد والمتميز. لذلك نحرص على تقديم مقالات 
                    عالية الجودة تساعد الطلاب على تطوير مهاراتهم الدراسية وتحقيق أهدافهم الأكاديمية.
                  </p>
                  <h2 className="font-title text-2xl text-primary mt-8 mb-4">نصائح إضافية</h2>
                  <ul>
                    <li>تحديد أهداف واضحة لكل جلسة مذاكرة.</li>
                    <li>استخدام الخرائط الذهنية لتنظيم الأفكار.</li>
                    <li>المراجعة الدورية للمعلومات لتثبيتها في الذاكرة.</li>
                    <li>الحصول على قسط كافٍ من النوم والراحة.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="shadow-lg"> {/* Enhanced card */}
              <CardHeader className="border-b border-border pb-4"> {/* Added border-bottom */}
                <CardTitle className="flex items-center gap-3 text-2xl font-title text-primary"> {/* Larger title */}
                  <MessageSquare className="h-6 w-6 text-accent" />
                  التعليقات ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6"> {/* Adjusted padding */}
                {/* Comment Form */}
                <div className="mb-8 p-6 bg-muted/50 rounded-xl border border-border shadow-sm"> {/* Enhanced form container */}
                  <h3 className="font-bold text-xl mb-4 text-primary">اترك تعليقاً</h3> {/* Larger, bolder title */}
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="شاركنا رأيك أو أسئلتك حول المقال..."
                    className="mb-4 text-base p-3 rounded-lg border-input focus-visible:ring-accent" // Enhanced textarea
                    rows={4}
                  />
                  <div className="flex flex-col sm:flex-row items-center gap-4"> {/* Better alignment */}
                    <Button onClick={handleCommentSubmit} className="gap-2 text-lg px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"> {/* Enhanced button */}
                      <Send className="h-5 w-5" />
                      <span>إرسال التعليق</span>
                    </Button>
                    <p className="text-sm text-muted-foreground flex items-center">
                      * التعليقات تحتاج موافقة المشرف قبل النشر
                    </p>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-6"> {/* Increased space-y */}
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment.id} className="border border-border rounded-xl p-5 bg-card shadow-sm"> {/* Enhanced comment card */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3"> {/* Increased gap */}
                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0"> {/* Larger avatar */}
                              <User className="h-5 w-5 text-accent" />
                            </div>
                            <span className="font-semibold text-lg text-foreground">{comment.user.display_name}</span> {/* Larger, bolder name */}
                            {!comment.approved && (
                              <Badge variant="secondary" className="text-xs font-medium px-3 py-1 rounded-full">
                                في انتظار الموافقة
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground flex-shrink-0">
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-foreground text-base leading-relaxed">{comment.content}</p> {/* Larger text */}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted" />
                      <p className="text-lg">لا توجد تعليقات حتى الآن. كن أول من يعلق!</p>
                    </div>
                  )}
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
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-title font-bold mb-4 text-foreground leading-tight">
            مقالات <span className="text-accent">المعافر</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            مجموعة مختارة من المقالات التعليمية والنصائح الدراسية لمساعدتك في رحلتك الأكاديمية
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-3xl mx-auto"> {/* Increased gap and max-width */}
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" /> {/* Larger icon */}
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المقالات..."
              className="pr-12 py-3 text-lg rounded-full border-input focus-visible:ring-accent shadow-sm" // Enhanced input
            />
          </div>
          <Button variant="outline" className="gap-2 text-lg px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300"> {/* Enhanced button */}
            <Filter className="h-5 w-5" /> {/* Larger icon */}
            <span>تصنيف</span>
          </Button>
        </div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap */}
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Card key={article.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-t-4 border-transparent hover:border-accent"> {/* Enhanced card, hover border */}
                <div onClick={() => handleArticleClick(article)}>
                  {article.cover_image_url && (
                    <div className="aspect-video overflow-hidden rounded-t-xl"> {/* Rounded top corners */}
                      <img 
                        src={article.cover_image_url}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" // Slower, smoother zoom
                      />
                    </div>
                  )}
                  <CardHeader className="pt-4 pb-2"> {/* Adjusted padding */}
                    <CardTitle className="text-xl font-title line-clamp-2 text-foreground"> {/* Larger title */}
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4"> {/* Adjusted padding */}
                    <p className="text-muted-foreground text-base line-clamp-3 mb-4 leading-relaxed"> {/* Larger text */}
                      {article.content}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-accent" /> {/* Accent icon */}
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-accent" /> {/* Accent icon */}
                          <span>{formatDate(article.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-accent" /> {/* Accent icon */}
                          <span>{article.comments_count}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))
          ) : (
            // Empty State
            <div className="col-span-full text-center py-16 bg-muted/20 rounded-xl shadow-inner"> {/* Enhanced empty state */}
              <div className="w-28 h-28 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-muted-foreground/20"> {/* Larger, bordered icon container */}
                <Search className="h-14 w-14 text-muted-foreground" /> {/* Larger icon */}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">لا توجد مقالات</h3>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                لم نجد أي مقالات تطابق بحثك. حاول بكلمات مفتاحية مختلفة أو تصفح جميع المقالات.
              </p>
              <Button variant="link" className="mt-4 text-accent text-lg" onClick={() => setSearchQuery("")}>
                عرض جميع المقالات
              </Button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-10 bg-gradient-to-br from-accent/10 to-background rounded-xl border border-accent/20 shadow-lg"> {/* Enhanced CTA section */}
          <h2 className="text-3xl md:text-4xl font-title font-bold mb-4 text-foreground leading-tight">
            هل لديك اقتراح لمقال جديد؟
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            شاركنا أفكارك واقتراحاتك للمواضيع التي تود قراءتها، وساهم في إثراء المحتوى التعليمي.
          </p>
          <Button className="gap-2 text-lg px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300"> {/* Enhanced button */}
            <MessageSquare className="h-5 w-5" />
            <span>اقترح موضوعاً</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Articles;
