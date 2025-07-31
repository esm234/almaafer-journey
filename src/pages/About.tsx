import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Import Button component
import { Calendar, User, MapPin, Award, Heart, Target } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-16"> {/* Increased vertical padding */}
        <div className="max-w-5xl mx-auto"> {/* Increased max-width for better layout */}
          {/* Hero Section */}
          <div className="text-center mb-16 relative overflow-hidden rounded-xl p-8 bg-gradient-to-br from-accent/10 to-background shadow-lg"> {/* Enhanced hero section */}
            <div className="w-36 h-36 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-accent/30 animate-pulse-slow"> {/* Larger, animated icon container */}
              <User className="h-20 w-20 text-accent drop-shadow-md" /> {/* Larger icon with shadow */}
            </div>
            <h1 className="text-5xl md:text-6xl font-title font-extrabold mb-4 text-foreground leading-tight"> {/* Larger, bolder title */}
              من هو <span className="text-accent drop-shadow-lg">المعافر</span>؟
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed italic"> {/* Larger, italicized quote */}
              "أتمنى أسيب علامة تشفع لي يوم القيامة"
            </p>
            {/* Subtle background pattern/overlay for visual interest */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zm0 30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4H10v4H6v2h4v4h2v-4h4v-2h-4zm0-30V0H10v4H6v2h4v4h2V6h4V4h-4zm0 30v-4H10v4H6v2h4v4h2v-4h4v-2h-4zm0 30v-4H10v4H6v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-10 mb-16"> {/* Increased gap */}
            {/* About Content */}
            <div className="md:col-span-2 space-y-8"> {/* Increased space-y */}
              <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-accent"> {/* Added shadow and border-top */}
                <CardHeader>
                  <CardTitle className="text-3xl font-title flex items-center gap-3 text-accent"> {/* Larger title, accent color */}
                    <Heart className="h-8 w-8 text-red-dark animate-pulse-slow" /> {/* Larger, animated icon */}
                    قصة المعافر
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 text-foreground leading-relaxed text-lg"> {/* Larger text, increased space-y */}
                  <p>
                    بدأت رحلة المعافر من رغبة صادقة في المساعدة والتأثير الإيجابي في مجتمع الطلاب العرب. 
                    اسم "المعافر" مستوحى من القبيلة العربية العريقة، والتي تعني القوة والشجاعة والصمود.
                  </p>
                  <p>
                    الهدف من هذا المشروع ليس مجرد قناة يوتيوب أو موقع إلكتروني، بل هو مجتمع داعم 
                    يجمع الطلاب من جميع أنحاء الوطن العربي لمشاركة رحلة التعلم والنجاح.
                  </p>
                  <p className="font-semibold italic text-muted-foreground"> {/* Emphasized quote */}
                    "أتمنى أسيب علامة تشفع لي يوم القيامة" - هذه الجملة ليست مجرد شعار، بل هي 
                    الدافع الحقيقي وراء كل محتوى ننتجه وكل خدمة نقدمها. نؤمن أن العلم والمعرفة 
                    من أعظم الصدقات الجارية.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-primary"> {/* Added shadow and border-top */}
                <CardHeader>
                  <CardTitle className="text-3xl font-title flex items-center gap-3 text-primary"> {/* Larger title, primary color */}
                    <Target className="h-8 w-8 text-primary drop-shadow-sm" /> {/* Larger icon */}
                    رؤيتنا ورسالتنا
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6"> {/* Increased space-y */}
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-accent flex items-center gap-2"> {/* Larger, bolder heading */}
                      <span className="text-primary">الرؤية</span>
                    </h3>
                    <p className="text-foreground text-lg"> {/* Larger text */}
                      أن نكون المنصة الأولى للمذاكرة الجماعية والتحفيز في الوطن العربي، 
                      ونساهم في بناء جيل متعلم ومثقف يحمل قيم الإسلام والعروبة.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-accent flex items-center gap-2"> {/* Larger, bolder heading */}
                      <span className="text-primary">الرسالة</span>
                    </h3>
                    <p className="text-foreground text-lg"> {/* Larger text */}
                      نقدم بيئة داعمة ومحفزة للطلاب من خلال البث المباشر وتقنيات الدراسة الحديثة، 
                      مع التركيز على القيم الأخلاقية والروحانية في رحلة التعلم.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats & Info Sidebar */}
            <div className="space-y-8"> {/* Increased space-y */}
              <Card className="shadow-sm hover:shadow-md transition-all duration-300"> {/* Added shadow */}
                <CardHeader>
                  <CardTitle className="text-xl font-title text-primary">معلومات سريعة</CardTitle> {/* Larger title, primary color */}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4"> {/* Increased gap */}
                    <Calendar className="h-6 w-6 text-accent flex-shrink-0" /> {/* Larger icon */}
                    <div>
                      <div className="font-medium text-lg text-foreground">تاريخ البداية</div> {/* Larger text */}
                      <div className="text-base text-muted-foreground">٢٠٢٤</div> {/* Larger text */}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6 text-accent flex-shrink-0" />
                    <div>
                      <div className="font-medium text-lg text-foreground">المنطقة</div>
                      <div className="text-base text-muted-foreground">الوطن العربي</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <User className="h-6 w-6 text-accent flex-shrink-0" />
                    <div>
                      <div className="font-medium text-lg text-foreground">التخصص</div>
                      <div className="text-base text-muted-foreground">Study With Me</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow-md transition-all duration-300"> {/* Added shadow */}
                <CardHeader>
                  <CardTitle className="text-xl font-title flex items-center gap-3 text-primary"> {/* Larger title, primary color */}
                    <Award className="h-6 w-6 text-accent" />
                    إنجازاتنا
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6"> {/* Increased space-y */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent mb-1">١٠٠٠+</div> {/* Larger, bolder number */}
                    <div className="text-base text-muted-foreground">طالب نشط</div> {/* Larger text */}
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-1">٥٠٠+</div>
                    <div className="text-base text-muted-foreground">ساعة بث مباشر</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-1">٢٠+</div>
                    <div className="text-base text-muted-foreground">مقال تعليمي</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow-md transition-all duration-300"> {/* Added shadow */}
                <CardHeader>
                  <CardTitle className="text-xl font-title text-primary">قيمنا</CardTitle> {/* Larger title, primary color */}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4"> {/* Increased space-y */}
                    <Badge variant="secondary" className="w-full justify-center py-3 text-base font-medium bg-secondary/70 hover:bg-secondary transition-colors"> {/* Larger, more prominent badge */}
                      العلم النافع
                    </Badge>
                    <Badge variant="secondary" className="w-full justify-center py-3 text-base font-medium bg-secondary/70 hover:bg-secondary transition-colors">
                      التعاون والمشاركة
                    </Badge>
                    <Badge variant="secondary" className="w-full justify-center py-3 text-base font-medium bg-secondary/70 hover:bg-secondary transition-colors">
                      الإخلاص في العمل
                    </Badge>
                    <Badge variant="secondary" className="w-full justify-center py-3 text-base font-medium bg-secondary/70 hover:bg-secondary transition-colors">
                      التطوير المستمر
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quote Section */}
          <Card className="bg-accent/10 border-accent/30 shadow-lg p-8 mb-16"> {/* Enhanced styling, increased padding */}
            <CardContent className="text-center p-0"> {/* Removed default padding */}
              <blockquote className="text-3xl md:text-4xl font-medium text-foreground mb-6 leading-snug italic"> {/* Larger, italicized quote */}
                "إن الله وملائكته والناس في السماوات والأرض، حتى النملة في جحرها، 
                وحتى الحوت، ليصلون على معلم الناس الخير"
              </blockquote>
              <p className="text-accent font-semibold text-xl">- الحديث الشريف</p> {/* Larger, bolder attribution */}
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center mt-12 bg-gradient-to-br from-primary/5 to-background rounded-xl p-10 shadow-lg"> {/* Enhanced CTA section */}
            <h2 className="text-4xl md:text-5xl font-title font-bold mb-4 text-foreground leading-tight">
              انضم إلى مجتمع <span className="text-accent">المعافر</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              كن جزءاً من رحلة التعلم والنمو مع آلاف الطلاب
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center"> {/* Increased gap */}
              <Button asChild className="px-10 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300 bg-accent text-accent-foreground hover:bg-red-dark"> {/* Larger, rounded, shadowed button */}
                <a href="/">
                  ابدأ المذاكرة الآن
                </a>
              </Button>
              <Button asChild variant="outline" className="px-10 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-2 border-border hover:bg-secondary"> {/* Larger, rounded, shadowed button */}
                <a href="/articles">
                  تصفح المقالات
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
