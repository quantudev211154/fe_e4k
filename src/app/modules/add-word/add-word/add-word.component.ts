import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { INewWord, IWord } from 'src/app/core/models';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { WordService } from 'src/app/core/services/word-service/word.service';
import { combineLatestWith } from 'rxjs';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss'],
})
export class AddWordComponent implements OnInit {
  wordId: string | undefined = undefined;
  vieVerForm: FormGroup;

  newWord: INewWord = {
    engVer: '',
    vieVers: [],
    images: [],
    audios: [],
  };
  vieVerCurrentValue = '';
  imageFiles: FileList;
  audioFiles: FileList;

  constructor(
    private fb: FormBuilder,
    private wordService: WordService,
    private router: Router,
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.vieVerForm = this.fb.group({
      vieVer: '',
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      const wordId = params['wordId'];

      if (!wordId) {
        return;
      }

      this.wordService.getWordById(wordId).subscribe((res: any) => {
        console.log(res.data.word);
        this.wordId = wordId;
        this.newWord = res.data.word;
      });
    });
  }

  onEngVerInput(event: Event) {
    const target = event.target as HTMLInputElement;

    this.newWord = {
      ...this.newWord,
      [target.name]: target.value,
    };
  }

  onVieVerKeyEnterDown(event: Event) {
    const target = event.target as HTMLInputElement;

    this.newWord = {
      ...this.newWord,
      vieVers: [...this.newWord.vieVers, target.value],
    };

    this.vieVerForm.setValue({
      vieVer: '',
    });
  }

  onLevelChange(event: Event) {
    const target = event.target as HTMLSelectElement;

    this.newWord = {
      ...this.newWord,
      [target.name]: target.value,
    };
  }

  removeOneVieVer(inputIndex: number) {
    const newVieVers = this.newWord.vieVers.filter(
      (vieVer, index) => index !== inputIndex
    );

    this.newWord.vieVers = newVieVers;
  }

  onUploadImages(event: Event) {
    const target = event.target as HTMLInputElement;

    if (!target.files || target.files.length === 0) return;

    this.imageFiles = target.files;
  }

  onUploadAudios(event: Event) {
    const target = event.target as HTMLInputElement;

    if (!target.files || target.files.length === 0) return;

    this.audioFiles = target.files;
  }

  saveNewWord(imageUrls: string[], audioUrls: string[]) {
    if (this.newWord.engVer !== '' && this.newWord.vieVers.length !== 0) {
      const { engVer, vieVers, ...rest } = this.newWord;

      const word: INewWord = {
        engVer: engVer.toLowerCase(),
        vieVers: vieVers.map((vieVer) => vieVer.toLowerCase()),
        ...rest,
      };
      word.images = imageUrls;
      word.audios = audioUrls;

      console.log(word);

      this.wordService.addNewWord(word).subscribe(() => {
        this.router.navigateByUrl('/words');
      });
    }
  }

  updateWord(imageUrls: string[], audioUrls: string[]) {
    if (this.newWord.engVer !== '' && this.newWord.vieVers.length !== 0) {
      const { engVer, vieVers, ...rest } = this.newWord;

      const word: INewWord = {
        engVer: engVer.toLowerCase(),
        vieVers: vieVers.map((vieVer) => vieVer.toLowerCase()),
        ...rest,
      };
      word.images = imageUrls;
      word.audios = audioUrls;

      console.log(word);

      this.wordService.updateWord(word, this.wordId as string).subscribe(() => {
        this.router.navigateByUrl('/words');
      });
    }
  }

  onClickSaveWordBtn() {
    if (this.imageFiles && this.imageFiles.length > 0) {
      this.firebaseService
        .pushListFileToStorage(this.imageFiles)
        .subscribe((imageUrls) => {
          if (imageUrls.length === this.imageFiles.length) {
            if (this.audioFiles && this.audioFiles.length > 0) {
              this.firebaseService
                .pushListFileToStorage(this.audioFiles)
                .subscribe((audioUrls) => {
                  if (audioUrls.length === this.audioFiles.length) {
                    this.saveNewWord(imageUrls, audioUrls);
                  }
                });
            } else {
              this.saveNewWord(imageUrls, []);
            }
          }
        });
    } else if (this.audioFiles && this.audioFiles.length > 0) {
      this.firebaseService
        .pushListFileToStorage(this.audioFiles)
        .subscribe((audioUrls) => {
          if (audioUrls.length === this.audioFiles.length) {
            this.saveNewWord([], audioUrls);
          }
        });
    } else {
      this.saveNewWord([], []);
    }
  }

  onClickUpdateWordBtn() {
    if (this.imageFiles && this.imageFiles.length > 0) {
      this.firebaseService
        .pushListFileToStorage(this.imageFiles)
        .subscribe((imageUrls) => {
          if (imageUrls.length === this.imageFiles.length) {
            if (this.audioFiles && this.audioFiles.length > 0) {
              this.firebaseService
                .pushListFileToStorage(this.audioFiles)
                .subscribe((audioUrls) => {
                  if (audioUrls.length === this.audioFiles.length) {
                    this.updateWord(
                      [...this.newWord.images, ...imageUrls],
                      [...this.newWord.audios, ...audioUrls]
                    );
                  }
                });
            } else {
              this.updateWord([...this.newWord.images, ...imageUrls], []);
            }
          }
        });
    } else if (this.audioFiles && this.audioFiles.length > 0) {
      this.firebaseService
        .pushListFileToStorage(this.audioFiles)
        .subscribe((audioUrls) => {
          if (audioUrls.length === this.audioFiles.length) {
            this.updateWord([], [...this.newWord.audios, ...audioUrls]);
          }
        });
    } else {
      this.updateWord([], []);
    }
  }
}
