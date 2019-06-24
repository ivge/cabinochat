import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'cabinochat';
  video = document.getElementById('main-video') as HTMLVideoElement;


quote;
quotes = ['я недавно видел как толстая тетка ела на улице булочку. просто шла и ела по ходу булочку. \n \
    и я подумал что наверно она какое то время пыталась похудеть все таки (она была не старая, до 40 дет) но в какой то момент дропнула.\n \
        и я подумал что наверно у каждого толстяка наступает момент когда он такой - а похуй - и достает булочку',

  'ну голосовые сообщения знаешь? вк/вайбер/телеграм \n\
когда записываешь аудиосообщение, отправляешь и кто-то слушает \n\
как кто-то - собеседник \n\
ну как собеседник - сослушатеговоритель \n\
конец',

  'чувак кидает в офисный чат новость. о том что новый президент Казахстана предложил переименовать Астану в Нурсултан. \n\
и следом кидает "смищьной" камент с сайта. а точнее скрин. я смотрю - а это его никнейм блять!\n\
он запостил камент на сайте, заскринил и в офисный кидает'
]



constructor() {
  this.video.addEventListener('ended', () => {
    this.video.currentTime = 0.05;
    this.video.play();
  });


  var quoterefresh = setInterval(() => {
    var max = this.quotes.length;
    var quoteindex = Math.floor(Math.random() * max);
    this.quote = this.quotes[quoteindex];
  }, 15000)

}
}
