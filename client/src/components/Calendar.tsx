import { Calendar as CalendarIcon, Clock, MapPin, Video, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Calendar() {
  const events = [
    {
      id: 1,
      title: 'Q4 Strategy Meeting',
      time: '2:00 PM - 3:30 PM',
      date: 'Oct 15, 2024',
      location: 'Conference Room A',
      attendees: ['Sarah Johnson', 'David Chen', 'Emily Rodriguez'],
      type: 'meeting',
    },
    {
      id: 2,
      title: 'Marketing Review',
      time: '10:00 AM - 11:00 AM',
      date: 'Oct 20, 2024',
      location: 'Virtual',
      attendees: ['Sarah Johnson', 'Team'],
      type: 'video',
    },
    {
      id: 3,
      title: 'Client Presentation',
      time: '3:00 PM - 4:00 PM',
      date: 'Oct 22, 2024',
      location: 'Client Office',
      attendees: ['John Doe', 'Jane Smith'],
      type: 'meeting',
    },
  ];

  return (
    <div className="p-4 space-y-4 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">Calendar</h2>
          <p className="text-sm text-muted-foreground">Manage your schedule and upcoming events</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <CalendarIcon className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
        
        {Array.from({ length: 35 }, (_, i) => {
          const day = i - 2; // Start from day -2 to show previous month
          const isToday = day === 15;
          const hasEvent = [15, 20, 22].includes(day);
          
          return (
            <button
              key={i}
              className={`
                aspect-square p-1.5 rounded-lg text-xs transition-all duration-200
                ${day < 1 || day > 31 ? 'text-muted-foreground/40' : ''}
                ${isToday ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-muted'}
                ${hasEvent && !isToday ? 'bg-primary/10 font-medium' : ''}
              `}
            >
              {day > 0 && day <= 31 ? day : ''}
              {hasEvent && !isToday && (
                <div className="w-1 h-1 bg-primary rounded-full mx-auto mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Upcoming Events */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold">Upcoming Events</h3>
        
        <div className="space-y-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-3 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{event.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {event.date}
                    </div>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${
                  event.type === 'video' ? 'bg-blue-500/10' : 'bg-primary/10'
                }`}>
                  {event.type === 'video' ? (
                    <Video className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Users className="w-5 h-5 text-primary" />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{event.attendees.length} attendees</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border flex gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {event.type === 'video' && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Video className="w-4 h-4 mr-2" />
                    Join Meeting
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
