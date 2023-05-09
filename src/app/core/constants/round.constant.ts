import {
  IBaseRound,
  IRoundType1,
  IRoundType2,
  IRoundType3,
  IRoundType4,
  IRoundType5,
  IRoundType6,
} from '../models';

export const ROUND_TYPES = [1, 2, 3, 4, 5, 6];

export const BASE_ROUND_INIT_VALUE: IBaseRound = {
  playType: ROUND_TYPES[0],
};

export const PLAY_TYPE_1_TOTAL_PAIRS = [2, 4];

export const ROUND_TYPE_1_INIT_VALUE: IRoundType1 = {
  playType: ROUND_TYPES[0],
  cards: [],
  totalPairs: PLAY_TYPE_1_TOTAL_PAIRS[0],
};

export const ROUND_TYPE_2_INIT_VALUE: IRoundType2 = {
  playType: ROUND_TYPES[1],
  cards: [],
  correctAns: '',
  question: '',
};

export const ROUND_TYPE_3_INIT_VALUE: IRoundType3 = {
  playType: ROUND_TYPES[2],
  isAudio: false,
  correctAns: '',
  question: '',
  randomWords: [],
};

export const ROUND_TYPE_4_INIT_VALUE: IRoundType4 = {
  playType: ROUND_TYPES[3],
  correctAns: '',
  question: '',
};

export const ROUND_TYPE_5_INIT_VALUE: IRoundType5 = {
  playType: ROUND_TYPES[4],
  cards: [],
  correctAns: '',
  isAudio: true,
  question: '',
};

export const ROUND_TYPE_6_INIT_VALUE: IRoundType6 = {
  playType: ROUND_TYPES[5],
  cards: [],
};

export const ROUND_TYPES_INFO = [
  {
    value: ROUND_TYPES[0],
    label: 'Kiểu 1: Lật ảnh',
    desc: 'Màn hình người chơi sẽ hiển thị các cặp ảnh (tối thiểu 2 cặp, tối đa 4 cặp). \n Mỗi ảnh sẽ gồm một hình minh hoạ và từ tiếng anh (hoặc tiếng Việt) tương ứng. \n Người chơi sẽ tìm ra những cặp ảnh có từ đi kèm đồng nghĩa với nhau.',
    initValue: ROUND_TYPE_1_INIT_VALUE,
  },
  {
    value: ROUND_TYPES[1],
    label: 'Kiểu 2: Tìm đáp án đúng',
    desc: 'Màn hình người chơi sẽ hiển thị một câu hỏi (tiếng Anh hoặc tiếng Việt hoặc một đoạn ghi âm) và 4 lựa chọn tương ứng với câu hỏi. \n Người chơi phải tìm ra câu trả lời đúng tuỳ theo câu hỏi là gì.',
    initValue: ROUND_TYPE_2_INIT_VALUE,
  },
  {
    value: ROUND_TYPES[2],
    label: 'Kiểu 3: Nối thành câu đúng',
    desc: 'Màn hình người chơi sẽ hiển thị một câu hỏi (tiếng Anh hoặc tiếng Việt hoặc một đoạn ghi âm) và nhiều lựa chọn phía dưới. \n Tuỳ vào câu hỏi là gì mà người chơi sẽ ghép các lựa chọn được cung cấp thành một câu sao cho đúng với những gì được hỏi.',
    initValue: ROUND_TYPE_3_INIT_VALUE,
  },
  {
    value: ROUND_TYPES[3],
    label: 'Kiểu 4: Điền vào chỗ trống',
    desc: 'Màn hình người chơi sẽ hiển thị một câu hỏi (tiếng Anh hoặc tiếng Việt hoặc một đoạn ghi âm) với một tù trống cần phải điền. \n Người chơi phải hiểu câu hỏi và nhập từ bàn phím từ còn thiếu ấy.',
    initValue: ROUND_TYPE_4_INIT_VALUE,
  },
  {
    value: ROUND_TYPES[4],
    label: 'Kiểu 5: Nghe và chọn',
    desc: 'Người chơi sẽ được cung cấp một đoạn phiên âm của từ (tiếng Anh hoặc tiếng Việt).\n Người chơi cần tìm ra nghĩa đối nghịch của từ đó.',
    initValue: ROUND_TYPE_5_INIT_VALUE,
  },
  {
    value: ROUND_TYPES[5],
    label: 'Kiểu 6: Nối hai cột',
    desc: 'Màn hình người chơi sẽ hiển thị 2 cột. \n Mỗi cột sẽ gồm các từ tiếng Anh (hoặc tiếng Việt). Cột còn lại sẽ hiển thị các đoạn ghi âm hoặc từ tương ứng. \n Số phần tử của cả hai cột đều bằng nhau.',
    initValue: ROUND_TYPE_6_INIT_VALUE,
  },
];

export const ROUND_TYPE_2_QUESTION_TYPE = [
  {
    value: 1,
    label: 'Hỏi từ tiếng Anh - Đáp từ Tiếng Việt',
    description:
      'Câu hỏi sẽ là từ tiếng Anh \n Người chơi cần chọn ảnh có chứa nghĩa tiếng Việt tương ứng',
  },
  {
    value: 2,
    label: 'Hỏi từ tiếng Việt - Đáp từ tiếng Anh',
    description:
      'Câu hỏi sẽ là từ tiếng Việt \n Người chơi cần chọn ảnh có chứa nghĩa tiếng Anh tương ứng',
  },
];

export const ROUND_TYPE_2_MAX_CARDS = 4;

export const ROUND_TYPE_5_MAX_CARDS = 4;

export const ROUND_TYPE_5_QUESTION_TYPE = [
  {
    value: 1,
    label: 'Audio tiếng Anh - Đáp tiếng Việt',
    description:
      'Câu hỏi sẽ là audio tiếng Anh \n Người chơi cần chọn ảnh có chứa nghĩa tiếng Việt tương ứng',
  },
  {
    value: 2,
    label: 'Audio tiếng Anh - Đáp tiếng Anh',
    description:
      'Câu hỏi sẽ là audio tiếng Anh \n Người chơi cần chọn ảnh có chứa từ được nhắc tới trong đoạn audio',
  },
];
