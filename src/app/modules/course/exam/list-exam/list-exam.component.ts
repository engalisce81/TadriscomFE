import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExamDto, ExamService, CreateUpdateExamDto } from '@proxy/dev/acadmy/exams';

@Component({
  selector: 'app-list-exam',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './list-exam.component.html',
  styleUrl: './list-exam.component.scss'
})
export class ListExamComponent implements OnInit {
  // البيانات
  exams: ExamDto[] = [];
  examForm!: FormGroup;
  
  // حالات الواجهة
  loading = false;
  submitting = false;
  search = '';
  courseId: string = ''; 

  // التحكم في النوافذ المنبثقة (Modals)
  showForm = false;
  isEditMode = false;
  selectedExamId: string | null = null;
  showDeleteConfirm = false;
  examToDelete: ExamDto | null = null;

  constructor(
    private examService: ExamService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // التقاط المعرف من الرابط (Param)
    this.courseId = this.route.snapshot.paramMap.get('id') || '';
    this.initForm();
    this.loadExams();
  }

  initForm() {
    this.examForm = this.fb.group({
      name: ['', Validators.required],
      timeExam: [0, [Validators.required, Validators.min(1)]],
      score: [0, [Validators.required, Validators.min(1)]],
      isActive: [true],
      courseId: [this.courseId] // يتم التثبيت من البرام تلقائياً
    });
  }

  loadExams() {
    this.loading = true;
    // جلب قائمة الامتحانات المفلترة حسب الكورس المأخوذ من الرابط
    this.examService.getList(1, 100, this.search).subscribe({
      next: (res) => {
        this.exams = res.items;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  // --- إدارة الفورم (Modal CRUD) ---
  openCreateForm() {
    this.isEditMode = false;
    this.showForm = true;
    this.examForm.reset({ 
      isActive: true, 
      timeExam: 0, 
      score: 0, 
      courseId: this.courseId 
    });
  }

  openEditForm(exam: ExamDto) {
    this.isEditMode = true;
    this.selectedExamId = exam.id;
    this.showForm = true;
    this.examForm.patchValue(exam);
  }

  closeForm() {
    this.showForm = false;
    this.selectedExamId = null;
  }

  submit() {
    if (this.examForm.invalid) return;
    this.submitting = true;

    const dto: CreateUpdateExamDto = this.examForm.value;

    const request = this.isEditMode && this.selectedExamId
      ? this.examService.update(this.selectedExamId, dto)
      : this.examService.create(dto);

    request.subscribe({
      next: () => {
        this.submitting = false;
        this.showForm = false;
        this.loadExams();
      },
      error: () => this.submitting = false
    });
  }

  // --- إدارة الحذف (Custom Modal) ---
  confirmDelete(exam: ExamDto) {
    this.examToDelete = exam;
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
    this.examToDelete = null;
  }

  deleteExam() {
    if (!this.examToDelete) return;
    this.loading = true;
    this.examService.delete(this.examToDelete.id).subscribe({
      next: () => {
        this.showDeleteConfirm = false;
        this.examToDelete = null;
        this.loadExams();
      },
      error: () => this.loading = false
    });
  }
}