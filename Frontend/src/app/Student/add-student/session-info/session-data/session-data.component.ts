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
    @Output() selectedSession = new EventEmitter<SessionModel>();

    OnDelete(){
        console.log("Firing delete");
        this.sessionDelete.emit(this.sessionModel);
    }
    
    Click(){
        console.log("Firing click");
        this.selectedSession.emit(this.sessionModel);
    }
}