
export interface CreateUpdateCourseFeedbackDto {
  courseId: string;
  rating: number;
  comment: string;
  isAccept: boolean;
}
