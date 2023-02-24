import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SessionModel } from "../session.model";

@Component({
    selector: 'session-data',
    templateUrl: './session-data.component.html',
    styleUrls: ['./session-data.component.css']
})
export class SessionData{
    @Input() sessionModel!: SessionModel;
    @Input() displayDelete = true;
    @Output() sessionDelete = new EventEmitter<SessionModel>();

    OnDelete(){
        this.sessionDelete.emit(this.sessionModel);
    }
}