import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EWordLevel, INewWord } from 'src/app/core/models';
import { WordService } from 'src/app/core/services/word-service/word.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss'],
})
export class AddWordComponent implements OnInit {
  vieVerForm: FormGroup;
  newWordLevels = [
    {
      label: 'Easy',
      value: EWordLevel.EASY,
    },
    {
      label: 'Medium',
      value: EWordLevel.MEDIUM,
    },
    {
      label: 'Hard',
      value: EWordLevel.HARD,
    },
  ];

  newWord: INewWord = {
    engVer: '',
    vieVers: [],
    level: EWordLevel.EASY,
    images: [],
    audios: [],
  };
  vieVerCurrentValue = '';

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private wordService: WordService
  ) {}

  ngOnInit(): void {
    this.vieVerForm = this.fb.group({
      vieVer: '',
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

  onSaveWord() {
    if (this.newWord.engVer !== '' && this.newWord.vieVers.length !== 0) {
      const { engVer, vieVers, ...rest } = this.newWord;

      const word: INewWord = {
        engVer: engVer.toLowerCase(),
        vieVers: vieVers.map((vieVer) => vieVer.toLowerCase()),
        ...rest,
      };

      this.wordService.addNewWord(word);
    }
  }
}
