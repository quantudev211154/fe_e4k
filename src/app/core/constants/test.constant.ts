import { ETestAttachmentType, ETestLevel, INewTest } from '../models';

export const NEW_TEST_INIT_VALUE: INewTest = {
  answers: [],
  attachment: '',
  attachmentType: ETestAttachmentType.NONE,
  correctAnswer: '',
  level: ETestLevel.EASY,
  question: '',
};

export const ALL_TEST_LEVELS = [
  {
    value: ETestLevel.EASY,
    label: 'Dễ',
    description: 'Dành cho các bạn chưa biết gì về tiếng Anh',
  },
  {
    value: ETestLevel.MEDIUM,
    label: 'Trung bình',
    description: 'Dành cho các bạn đã có chút ít về tiếng Anh',
  },
];

export const TEST_ATTACHMENT_TYPE = [
  {
    value: ETestAttachmentType.NONE,
    label: 'Không đính kèm',
  },
  {
    value: ETestAttachmentType.IMAGE,
    label: 'Hình ảnh',
  },
  {
    value: ETestAttachmentType.AUDIO,
    label: 'Audio',
  },
];

export const NEW_TEST_MIN_ANSWER_QTY = 2;
export const NEW_TEST_MAX_ANSWER_QTY = 4;
