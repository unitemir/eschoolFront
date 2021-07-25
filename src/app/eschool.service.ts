import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { Student } from "./student";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EschoolService {
    private apiServerUrl = environment.apiBaseUrl;
    
    constructor(private http: HttpClient) { }
    
    public getStudents(): Observable<any>{
        return this.http.get(`${this.apiServerUrl}/student/all`);
    }

    public addStudent(student: Student): Observable<void>{
        return this.http.post<void>(`${this.apiServerUrl}/student/add`, student);
    }

    public deleteStudents(studentId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/student/delete/${studentId}`);
    }
}