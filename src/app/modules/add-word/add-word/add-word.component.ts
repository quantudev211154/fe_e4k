import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ESnackbarStatus, INewWord, IWord } from 'src/app/core/models';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { WordService } from 'src/app/core/services/word-service/word.service';
import { combineLatestWith } from 'rxjs';
import { RouteConstant } from 'src/app/core/constants';
import { SnackbarService } from 'src/app/core/services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss'],
})
export class AddWordComponent implements OnInit {
  wordId: string | undefined = undefined;
  mode: string | undefined = undefined;
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

  allImgs: string[] = [];
  allAudios: string[] = [];

  constructor(
    private fb: FormBuilder,
    private wordService: WordService,
    private router: Router,
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.vieVerForm = this.fb.group({
      vieVer: '',
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      const wordId = params['wordId'];
      const mode = params['mode'];

      if (mode === 'edit' || mode === 'view') {
        this.wordService.getWordById(wordId).subscribe((res: any) => {
          this.wordId = wordId;
          this.newWord = res.data.word;
        });
      }

      this.mode = mode;
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

    console.log(this.imageFiles.length);

    const newImgs = this.allImgs;

    for (let i = 0; i < this.imageFiles.length; ++i) {
      const file = this.imageFiles[i];

      newImgs.push(URL.createObjectURL(file));
    }

    this.allImgs = newImgs;
  }

  onUploadAudios(event: Event) {
    const target = event.target as HTMLInputElement;

    if (!target.files || target.files.length === 0) return;

    this.audioFiles = target.files;

    const newAudios = this.allAudios;

    for (let i = 0; i < this.audioFiles.length; ++i) {
      const file = this.audioFiles[i];

      newAudios.push(URL.createObjectURL(file));
    }

    this.allAudios = newAudios;
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

      this.wordService.addNewWord(word).subscribe(() => {
        this.router.navigateByUrl('/words');
      });
    }
  }

  updateWord(imageUrls: string[], audioUrls: string[]) {
    if (this.newWord.engVer === '') {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        'Hãy cung cấp từ tiếng Anh'
      );
      return;
    }

    if (this.newWord.vieVers.length === 0) {
      this.snackbarService.showSnackbar(
        ESnackbarStatus.WARNING,
        'Hãy cung cấp các nghĩa tiếng Việt tương  ứng'
      );
      return;
    }

    const { engVer, vieVers, ...rest } = this.newWord;

    const word: INewWord = {
      engVer: engVer.toLowerCase(),
      vieVers: vieVers.map((vieVer) => vieVer.toLowerCase()),
      ...rest,
    };
    word.images = imageUrls;
    word.audios = audioUrls;

    this.wordService.updateWord(word, this.wordId as string).subscribe(() => {
      this.router.navigateByUrl('/words');
    });
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
              this.updateWord(
                [...this.newWord.images, ...imageUrls],
                [...this.newWord.audios]
              );
            }
          }
        });
    } else if (this.audioFiles && this.audioFiles.length > 0) {
      this.firebaseService
        .pushListFileToStorage(this.audioFiles)
        .subscribe((audioUrls) => {
          if (audioUrls.length === this.audioFiles.length) {
            this.updateWord(
              [...this.newWord.images],
              [...this.newWord.audios, ...audioUrls]
            );
          }
        });
    } else {
      this.updateWord([...this.newWord.images], [...this.newWord.audios]);
    }
  }

  goToEditWord() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const wordId = params['wordId'];
      const mode = params['mode'];

      if (!wordId) {
        return;
      }

      this.mode = mode;

      this.router.navigateByUrl(
        `${RouteConstant.ROUTE_WORDS}/customize-word?wordId=${wordId}&mode=edit`
      );
    });
  }
}
