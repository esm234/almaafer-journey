import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Users, Calendar, Trophy, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-title font-bold mb-6 text-foreground">
            مرحباً بكم في{" "}
            <span className="text-accent">المعافر</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            انضم لآلاف الطلاب في رحلة المذاكرة الجماعية والتحفيز المستمر
            <br />
            <span className="text-accent font-medium">"أتمنى أسيب علامة تشفع لي يوم القيامة"</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-medium gap-2">
              <Play className="h-5 w-5" />
              شاهد البث المباشر
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg font-medium gap-2">
              <Clock className="h-5 w-5" />
              ابدأ جلسة بومودورو
            </Button>
          </div>
        </section>

        {/* Live Stream Section */}
        <section className="mb-12">
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-title flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  البث المباشر
                </CardTitle>
                <Badge variant="destructive" className="bg-accent text-accent-foreground">
                  مباشر الآن
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.youtube.com/embed/Qw-yBeWAkO8?autoplay=1&mute=1"
                  title="البث المباشر"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>١٢٣٤ مشاهد</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>بدأ منذ ٢ ساعة</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Schedule and Leaderboard */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Weekly Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-title flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                جدول البث الأسبوعي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { day: "السبت", time: "٨:٠٠ - ١٢:٠٠ م", status: "اليوم" },
                  { day: "الأحد", time: "٧:٠٠ - ١١:٠٠ م", status: "غداً" },
                  { day: "الاثنين", time: "٨:٠ـ - ١٢:٠٠ م", status: "" },
                  { day: "الثلاثاء", time: "٧:٠٠ - ١١:٠٠ م", status: "" },
                  { day: "الأربعاء", time: "٨:٠٠ - ١٢:٠٠ م", status: "" },
                ].map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <div className="font-medium text-foreground">{schedule.day}</div>
                      <div className="text-sm text-muted-foreground">{schedule.time}</div>
                    </div>
                    {schedule.status && (
                      <Badge variant={schedule.status === "اليوم" ? "default" : "secondary"} className="bg-accent text-accent-foreground">
                        {schedule.status}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-title flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                لوحة المتصدرين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "أحمد محمد", hours: "٤٥ ساعة", sessions: "١٢٠ جلسة" },
                  { rank: 2, name: "فاطمة علي", hours: "٤٢ ساعة", sessions: "١١٥ جلسة" },
                  { rank: 3, name: "محمد سعد", hours: "٣٨ ساعة", sessions: "١٠٥ جلسة" },
                  { rank: 4, name: "نور الهدى", hours: "٣٥ ساعة", sessions: "٩٨ جلسة" },
                  { rank: 5, name: "يوسف كمال", hours: "٣٢ ساعة", sessions: "٩٠ جلسة" },
                ].map((user) => (
                  <div key={user.rank} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${user.rank === 1 ? 'bg-accent text-accent-foreground' : 
                        user.rank === 2 ? 'bg-secondary text-secondary-foreground' : 
                        user.rank === 3 ? 'bg-muted text-muted-foreground' : 'bg-background text-foreground border border-border'}`}>
                      {user.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.hours} • {user.sessions}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <section className="text-center">
          <h2 className="text-3xl font-title font-bold mb-8 text-foreground">
            لماذا تختار المعافر؟
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-title font-bold mb-2">مذاكرة جماعية</h3>
                <p className="text-muted-foreground">انضم لآلاف الطلاب في جلسات مذاكرة مباشرة ومحفزة</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-title font-bold mb-2">نظام البومودورو</h3>
                <p className="text-muted-foreground">تقنية مثبتة علمياً لزيادة التركيز والإنتاجية</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-title font-bold mb-2">مجتمع داعم</h3>
                <p className="text-muted-foreground">تفاعل مع مجتمع من الطلاب المتحفزين والداعمين</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
