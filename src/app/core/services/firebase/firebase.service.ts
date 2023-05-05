import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { RandomService } from '../random-service/random.service';
import { Subject, finalize } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private basePath = '/uploads';

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private randomService: RandomService
  ) {}

  private pushFileToStorage(file: File) {
    const urlSubject: Subject<string> = new Subject();

    const filePath = `${
      this.basePath
    }/${this.randomService.generateRandomUUID()}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadUrl) => {
            urlSubject.next(downloadUrl);
          });
        })
      )
      .subscribe();

    return urlSubject;
  }

  public pushListFileToStorage(fileList: FileList) {
    const observable = new Observable<string[]>((observer) => {
      const uploadedListUrl: string[] = [];

      for (let i = 0; i < fileList.length; ++i) {
        this.pushFileToStorage(fileList[0]).subscribe((url) => {
          uploadedListUrl.push(url);
          observer.next(uploadedListUrl);
        });
      }
    });

    return observable;
  }
}
