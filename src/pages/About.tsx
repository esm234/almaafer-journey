import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, MapPin, Award, Heart, Target } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="h-16 w-16 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-title font-bold mb-4 text-foreground">
              من هو <span className="text-accent">المعافر</span>؟
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              "أتمنى أسيب علامة تشفع لي يوم القيامة"
            </p>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* About Content */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-title flex items-center gap-2">
                    <Heart className="h-6 w-6 text-accent" />
                    قصة المعافر
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    بدأت رحلة المعافر من رغبة صادقة في المساعدة والتأثير الإيجابي في مجتمع الطلاب العرب. 
                    اسم "المعافر" مستوحى من القبيلة العربية العريقة، والتي تعني القوة والشجاعة والصمود.
                  </p>
                  <p>
                    الهدف من هذا المشروع ليس مجرد قناة يوتيوب أو موقع إلكتروني، بل هو مجتمع داعم 
                    يجمع الطلاب من جميع أنحاء الوطن العربي لمشاركة رحلة التعلم والنجاح.
                  </p>
                  <p>
                    "أتمنى أسيب علامة تشفع لي يوم القيامة" - هذه الجملة ليست مجرد شعار، بل هي 
                    الدافع الحقيقي وراء كل محتوى ننتجه وكل خدمة نقدمها. نؤمن أن العلم والمعرفة 
                    من أعظم الصدقات الجارية.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-title flex items-center gap-2">
                    <Target className="h-6 w-6 text-accent" />
                    رؤيتنا ورسالتنا
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-accent">الرؤية</h3>
                    <p className="text-foreground">
                      أن نكون المنصة الأولى للمذاكرة الجماعية والتحفيز في الوطن العربي، 
                      ونساهم في بناء جيل متعلم ومثقف يحمل قيم الإسلام والعروبة.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-accent">الرسالة</h3>
                    <p className="text-foreground">
                      نقدم بيئة داعمة ومحفزة للطلاب من خلال البث المباشر وتقنيات الدراسة الحديثة، 
                      مع التركيز على القيم الأخلاقية والروحانية في رحلة التعلم.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats & Info Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-title">معلومات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-accent" />
                    <div>
                      <div className="font-medium">تاريخ البداية</div>
                      <div className="text-sm text-muted-foreground">٢٠٢٤</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-accent" />
                    <div>
                      <div className="font-medium">المنطقة</div>
                      <div className="text-sm text-muted-foreground">الوطن العربي</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-accent" />
                    <div>
                      <div className="font-medium">التخصص</div>
                      <div className="text-sm text-muted-foreground">Study With Me</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-title flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    إنجازاتنا
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">١٠٠٠+</div>
                    <div className="text-sm text-muted-foreground">طالب نشط</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">٥٠٠+</div>
                    <div className="text-sm text-muted-foreground">ساعة بث مباشر</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">٢٠+</div>
                    <div className="text-sm text-muted-foreground">مقال تعليمي</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-title">قيمنا</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="secondary" className="w-full justify-center py-2">
                      العلم النافع
                    </Badge>
                    <Badge variant="secondary" className="w-full justify-center py-2">
                      التعاون والمشاركة
                    </Badge>
                    <Badge variant="secondary" className="w-full justify-center py-2">
                      الإخلاص في العمل
                    </Badge>
                    <Badge variant="secondary" className="w-full justify-center py-2">
                      التطوير المستمر
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quote Section */}
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-8 text-center">
              <blockquote className="text-2xl font-medium text-foreground mb-4">
                "إن الله وملائكته والناس في السماوات والأرض، حتى النملة في جحرها، 
                وحتى الحوت، ليصلون على معلم الناس الخير"
              </blockquote>
              <p className="text-accent font-medium">- الحديث الشريف</p>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-3xl font-title font-bold mb-4 text-foreground">
              انضم إلى مجتمع المعافر
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              كن جزءاً من رحلة التعلم والنمو مع آلاف الطلاب
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
              >
                ابدأ المذاكرة الآن
              </a>
              <a 
                href="/articles"
                className="inline-flex items-center justify-center rounded-md border border-border px-8 py-3 font-medium hover:bg-muted transition-colors"
              >
                تصفح المقالات
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;