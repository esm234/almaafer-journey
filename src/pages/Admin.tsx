import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Shield,
  BarChart3
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArticles: 0,
    pendingComments: 0,
    totalSessions: 0
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);

      // Check user role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      if (!roleData || roleData.role !== 'admin') {
        toast({
          title: "غير مسموح",
          description: "ليس لديك صلاحية الوصول لهذه الصفحة",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setUserRole(roleData.role);
      await loadAdminData();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const loadAdminData = async () => {
    try {
      // Load articles
      const { data: articlesData } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      // Load comments
      const { data: commentsData } = await supabase
        .from('comments')
        .select(`
          *,
          articles(title),
          profiles(display_name)
        `)
        .order('created_at', { ascending: false });

      // Load users with roles
      const { data: usersData } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles(role)
        `);

      // Load stats
      const { data: sessionsData } = await supabase
        .from('pomodoro_sessions')
        .select('id');

      setArticles(articlesData || []);
      setComments(commentsData || []);
      setUsers(usersData || []);
      setStats({
        totalUsers: usersData?.length || 0,
        totalArticles: articlesData?.length || 0,
        pendingComments: commentsData?.filter(c => !c.approved).length || 0,
        totalSessions: sessionsData?.length || 0
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  const handleApproveComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .update({ approved: true })
        .eq('id', commentId);

      if (error) throw error;

      toast({
        title: "تم الموافقة",
        description: "تم الموافقة على التعليق",
      });

      await loadAdminData();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "لم يتم الموافقة على التعليق",
        variant: "destructive",
      });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف التعليق",
      });

      await loadAdminData();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "لم يتم حذف التعليق",
        variant: "destructive",
      });
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف المقال",
      });

      await loadAdminData();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "لم يتم حذف المقال",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </Layout>
    );
  }

  if (!userRole || userRole !== 'admin') {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-title font-bold text-foreground">
                لوحة تحكم الإدارة
              </h1>
            </div>
            <p className="text-muted-foreground">
              مرحباً {user?.user_metadata?.display_name || user?.email} - إدارة موقع المعافر
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{stats.totalUsers}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المقالات</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{stats.totalArticles}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">تعليقات معلقة</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{stats.pendingComments}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">جلسات البومودورو</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{stats.totalSessions}</div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Tabs */}
          <Tabs defaultValue="comments" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="comments">التعليقات</TabsTrigger>
              <TabsTrigger value="articles">المقالات</TabsTrigger>
              <TabsTrigger value="users">المستخدمين</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>

            {/* Comments Management */}
            <TabsContent value="comments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-accent" />
                    إدارة التعليقات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">
                                {comment.profiles?.display_name || 'مستخدم'}
                              </span>
                              <Badge variant={comment.approved ? "default" : "secondary"}>
                                {comment.approved ? "موافق عليه" : "في انتظار الموافقة"}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              على مقال: {comment.articles?.title || 'مقال محذوف'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(comment.created_at)}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!comment.approved && (
                              <Button
                                size="sm"
                                onClick={() => handleApproveComment(comment.id)}
                                className="gap-1"
                              >
                                <Check className="h-4 w-4" />
                                موافقة
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteComment(comment.id)}
                              className="gap-1"
                            >
                              <Trash2 className="h-4 w-4" />
                              حذف
                            </Button>
                          </div>
                        </div>
                        <p className="text-foreground">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Articles Management */}
            <TabsContent value="articles" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    إدارة المقالات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <div key={article.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium mb-2">{article.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <Badge variant={article.published ? "default" : "secondary"}>
                                {article.published ? "منشور" : "مسودة"}
                              </Badge>
                              <span>{formatDate(article.created_at)}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {article.content?.substring(0, 200)}...
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button size="sm" variant="outline" className="gap-1">
                              <Edit className="h-4 w-4" />
                              تعديل
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteArticle(article.id)}
                              className="gap-1"
                            >
                              <Trash2 className="h-4 w-4" />
                              حذف
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Management */}
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    إدارة المستخدمين
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{user.display_name || 'بدون اسم'}</div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(user.created_at)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {user.user_roles?.[0]?.role || 'user'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-accent" />
                    إعدادات الموقع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">رابط البث المباشر</label>
                      <Input placeholder="https://..." className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">عنوان الموقع</label>
                      <Input defaultValue="المعافر - Study With Me" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">وصف الموقع</label>
                      <Textarea 
                        defaultValue="أتمنى أسيب علامة تشفع لي يوم القيامة" 
                        className="mt-1" 
                      />
                    </div>
                    <Button>حفظ الإعدادات</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;