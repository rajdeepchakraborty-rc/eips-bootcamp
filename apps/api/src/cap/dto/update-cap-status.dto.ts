export class UpdateCapStatusDto {
  status!: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
}