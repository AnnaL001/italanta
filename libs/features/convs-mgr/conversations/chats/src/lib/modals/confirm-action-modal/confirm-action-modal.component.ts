import {Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Logger, ToastService } from '@iote/bricks-angular';
import { BackendService } from '@ngfi/angular';
import { from } from 'rxjs';

@Component({
  selector: 'elewa-move-to-section-modal',
  styleUrls: ['confirm-action-modal.component.scss'],
  templateUrl: 'confirm-action-modal.component.html',
})
export class ConfirmActionModal
{
  isLoaded = false;
  resume = false;
  
  constructor(
              private _backendService: BackendService,
              private _dialogRef: MatDialogRef<ConfirmActionModal>,
              private _toastService: ToastService,
              private _logger: Logger,
              @Inject(MAT_DIALOG_DATA) private _data: { req: { chatId: string, action: 'resume' }, 
                                                        action: 'talkToHuman' | 'assignChat' })
  {
    this.resume = this._data.action === 'assignChat';
  }

  confirm()
  {
    from(this._backendService.callFunction(this._data.action, this._data.req)).subscribe();
    
    this.exitModal();
    if(this.resume)
    {
      this._toastService.doSimpleToast('Resuming Chat...');   
    }
    else
    {
      this._toastService.doSimpleToast('Pausing Chat...');      
    }
  }

  exitModal = () => this._dialogRef.close();

}