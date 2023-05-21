import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PLAY_TYPE_1_TOTAL_PAIRS,
  ROUND_TYPES_INFO,
  ROUND_TYPE_1_INIT_VALUE,
  ROUND_TYPE_2_INIT_VALUE,
  ROUND_TYPE_2_QUESTION_TYPE,
  ROUND_TYPE_3_INIT_VALUE,
  ROUND_TYPE_4_INIT_VALUE,
  ROUND_TYPE_5_INIT_VALUE,
  ROUND_TYPE_6_INIT_VALUE,
} from 'src/app/core/constants';
import { IType1Card, IType2Card, IWord } from 'src/app/core/models';
import { ArrayService } from 'src/app/core/services/array-service/array.service';
import { RandomService } from 'src/app/core/services/random-service/random.service';
import { RoundService } from 'src/app/core/services/round-service/round.service';
import { WordService } from 'src/app/core/services/word-service/word.service';

@Component({
  selector: 'app-add-round',
  templateUrl: './add-round.component.html',
  styleUrls: ['./add-round.component.scss'],
})
export class AddRoundComponent implements OnInit {
  currentPlayType = ROUND_TYPE_1_INIT_VALUE.playType;

  roundTypeInfo = ROUND_TYPES_INFO;

  constructor() {}

  ngOnInit(): void {}

  onPlayTypeSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedType = parseInt(target.value);

    this.currentPlayType = selectedType;
  }
}
