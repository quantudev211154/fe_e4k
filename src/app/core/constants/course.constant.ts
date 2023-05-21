import { ECourseLevel } from '../models';

export const COURSE_TYPES = [
  {
    label: 'Đã ra mắt',
    description: 'Đã ra mắt người dùng',
    value: 'PUBLISHED',
  },
  {
    label: 'Đang thử nghiệm',
    description: 'Đang trong giai đoạn thử nghiệm',
    value: 'DRAFT',
  },
];

export const COURSE_LEVELS = [
  {
    label: 'Rất dễ',
    description: 'Dành cho các bạn nhỏ chưa biết gì về Tiếng Anh',
    value: ECourseLevel.EASY,
  },
  {
    label: 'Trung bình',
    description: 'Dành cho các bạn nhỏ đã có chút ít kiến thức tiếng Anh',
    value: ECourseLevel.MEDIUM,
  },
  {
    label: 'Khó',
    description: 'Dành cho các bạn nhỏ đã có kiến thức nền tảng tốt',
    value: ECourseLevel.HARD,
  },
];
