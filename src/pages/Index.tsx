import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const tutors = [
  {
    id: 1,
    name: 'Анна Петрова',
    subject: 'Математика',
    experience: '8 лет',
    rating: 4.9,
    reviews: 127,
    price: 1500,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    description: 'Кандидат наук, специализируюсь на подготовке к ЕГЭ и ОГЭ. Индивидуальный подход к каждому ученику.',
    achievements: ['ЕГЭ 100 баллов', 'Победители олимпиад', '200+ учеников'],
    schedule: ['Пн 15:00-20:00', 'Ср 15:00-20:00', 'Пт 15:00-20:00'],
  },
  {
    id: 2,
    name: 'Дмитрий Соколов',
    subject: 'Английский язык',
    experience: '12 лет',
    rating: 5.0,
    reviews: 243,
    price: 2000,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
    description: 'Сертифицированный преподаватель IELTS и TOEFL. Жил в США 5 лет, носитель практического английского.',
    achievements: ['IELTS 8.5', 'TOEFL сертификат', 'Cambridge certified'],
    schedule: ['Вт 14:00-21:00', 'Чт 14:00-21:00', 'Сб 10:00-18:00'],
  },
  {
    id: 3,
    name: 'Елена Волкова',
    subject: 'Физика',
    experience: '6 лет',
    rating: 4.8,
    reviews: 89,
    price: 1800,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    description: 'Преподаватель физики в ведущем лицее. Готовлю к поступлению в технические вузы.',
    achievements: ['МГУ выпускник', 'Олимпиады', 'Авторские методики'],
    schedule: ['Пн 16:00-19:00', 'Ср 16:00-19:00', 'Сб 12:00-17:00'],
  },
  {
    id: 4,
    name: 'Игорь Морозов',
    subject: 'Программирование',
    experience: '10 лет',
    rating: 4.9,
    reviews: 156,
    price: 2500,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Igor',
    description: 'Senior developer с опытом в Google. Обучаю Python, JavaScript, алгоритмам и структурам данных.',
    achievements: ['Ex-Google', 'Kaggle Expert', '50+ проектов'],
    schedule: ['Вт 18:00-22:00', 'Чт 18:00-22:00', 'Вс 14:00-20:00'],
  },
  {
    id: 5,
    name: 'Мария Кузнецова',
    subject: 'Химия',
    experience: '7 лет',
    rating: 4.7,
    reviews: 102,
    price: 1600,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    description: 'Специалист по подготовке к ЕГЭ по химии. Высокие результаты учеников ежегодно.',
    achievements: ['ЕГЭ 95+ баллов', 'МГУ химфак', 'Олимпиадники'],
    schedule: ['Пн 15:00-19:00', 'Ср 15:00-19:00', 'Пт 15:00-19:00'],
  },
  {
    id: 6,
    name: 'Александр Иванов',
    subject: 'История',
    experience: '15 лет',
    rating: 5.0,
    reviews: 198,
    price: 1700,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander',
    description: 'Доктор исторических наук. Готовлю к экзаменам и развиваю аналитическое мышление.',
    achievements: ['Доктор наук', 'Автор книг', 'ТВ-эксперт'],
    schedule: ['Вт 16:00-20:00', 'Чт 16:00-20:00', 'Сб 11:00-16:00'],
  },
];

const subjects = ['Все предметы', 'Математика', 'Английский язык', 'Физика', 'Программирование', 'Химия', 'История'];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Все предметы');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedTutor, setSelectedTutor] = useState<typeof tutors[0] | null>(null);

  const filteredTutors = tutors
    .filter(tutor => {
      const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tutor.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject === 'Все предметы' || tutor.subject === selectedSubject;
      return matchesSearch && matchesSubject;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="GraduationCap" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">TutorHub</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Репетиторы</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Как это работает</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">О нас</a>
              <Button variant="outline" size="sm">Войти</Button>
              <Button size="sm">Стать репетитором</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-primary/5 py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-5xl font-bold mb-4 text-gray-900">Найдите идеального репетитора</h2>
            <p className="text-xl text-gray-600">Тысячи проверенных преподавателей готовы помочь вам достичь ваших целей</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Icon name="Search" size={20} className="absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Поиск по имени или предмету..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full md:w-[200px] h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="h-12 px-8">
                <Icon name="Search" size={20} className="mr-2" />
                Найти
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Доступные репетиторы</h3>
            <p className="text-gray-600 mt-1">Найдено {filteredTutors.length} преподавателей</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Сортировка:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="price-low">Цена: по возрастанию</SelectItem>
                <SelectItem value="price-high">Цена: по убыванию</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor, index) => (
            <Card 
              key={tutor.id} 
              className="cursor-pointer overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={tutor.image} alt={tutor.name} />
                    <AvatarFallback>{tutor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-lg text-gray-900 truncate">{tutor.name}</h4>
                    <p className="text-sm text-gray-600">{tutor.subject}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Icon name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{tutor.rating}</span>
                      <span className="text-sm text-gray-500">({tutor.reviews})</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tutor.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">
                    <Icon name="Calendar" size={14} className="mr-1" />
                    {tutor.experience}
                  </Badge>
                  <Badge variant="outline">
                    <Icon name="Award" size={14} className="mr-1" />
                    Верифицирован
                  </Badge>
                </div>

                <Separator className="mb-4" />

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{tutor.price} ₽</span>
                    <span className="text-sm text-gray-500">/час</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedTutor(tutor)}>
                        Подробнее
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Профиль репетитора</DialogTitle>
                      </DialogHeader>
                      {selectedTutor && (
                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-24 h-24">
                              <AvatarImage src={selectedTutor.image} alt={selectedTutor.name} />
                              <AvatarFallback>{selectedTutor.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-gray-900">{selectedTutor.name}</h3>
                              <p className="text-lg text-gray-600 mb-2">{selectedTutor.subject}</p>
                              <div className="flex items-center gap-2 mb-2">
                                <Icon name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                                <span className="font-semibold">{selectedTutor.rating}</span>
                                <span className="text-gray-500">({selectedTutor.reviews} отзывов)</span>
                              </div>
                              <div className="flex gap-2">
                                <Badge variant="secondary">{selectedTutor.experience} опыта</Badge>
                                <Badge variant="outline">Верифицирован</Badge>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                              <Icon name="User" size={20} className="text-primary" />
                              О репетиторе
                            </h4>
                            <p className="text-gray-600">{selectedTutor.description}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                              <Icon name="Award" size={20} className="text-primary" />
                              Достижения
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedTutor.achievements.map((achievement, idx) => (
                                <Badge key={idx} variant="secondary" className="text-sm">
                                  {achievement}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                              <Icon name="Clock" size={20} className="text-primary" />
                              Расписание
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {selectedTutor.schedule.map((time, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                  <Icon name="Calendar" size={16} className="text-gray-500" />
                                  <span className="text-sm">{time}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <Tabs defaultValue="reviews" className="w-full">
                            <TabsList className="w-full">
                              <TabsTrigger value="reviews" className="flex-1">Отзывы</TabsTrigger>
                              <TabsTrigger value="portfolio" className="flex-1">Портфолио</TabsTrigger>
                            </TabsList>
                            <TabsContent value="reviews" className="space-y-4 mt-4">
                              {[1, 2, 3].map((review) => (
                                <Card key={review}>
                                  <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                      <Avatar className="w-10 h-10">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Student${review}`} />
                                        <AvatarFallback>У{review}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="font-medium">Ученик {review}</span>
                                          <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                              <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
                                            ))}
                                          </div>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                          Отличный преподаватель! Доступно объясняет сложные темы, всегда готов помочь. 
                                          Результаты видны уже после нескольких занятий.
                                        </p>
                                        <span className="text-xs text-gray-400 mt-2 block">2 недели назад</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </TabsContent>
                            <TabsContent value="portfolio" className="mt-4">
                              <div className="grid grid-cols-2 gap-3">
                                {[1, 2, 3, 4].map((item) => (
                                  <Card key={item} className="overflow-hidden">
                                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                      <Icon name="FileText" size={32} className="text-primary" />
                                    </div>
                                    <CardContent className="p-3">
                                      <p className="text-sm font-medium">Методический материал {item}</p>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </TabsContent>
                          </Tabs>

                          <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-6 rounded-lg gap-4">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Стоимость занятия</p>
                              <p className="text-3xl font-bold text-gray-900">{selectedTutor.price} ₽<span className="text-lg text-gray-500">/час</span></p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="lg">
                                <Icon name="MessageCircle" size={20} className="mr-2" />
                                Написать
                              </Button>
                              <Button size="lg">
                                <Icon name="Calendar" size={20} className="mr-2" />
                                Записаться
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="GraduationCap" size={28} className="text-primary" />
                <span className="text-xl font-bold">TutorHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Лучшая платформа для поиска квалифицированных репетиторов
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Связь</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon name="MessageCircle" size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon name="Mail" size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon name="Phone" size={20} />
                </a>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-gray-400 text-sm">
            © 2024 TutorHub. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
