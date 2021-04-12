import { Component, OnInit } from '@angular/core';
import {ClubService} from '~services/club-service/club.service';
import {Club} from '~models/club';


interface ClubExpandableItem {
  club: Club;
  expand: boolean;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {

  editCache: any[] = [];

  clubs: ClubExpandableItem[] = [];

  testClub: Club = {
    clubMembers: [],
    clubName: 'Daniels',
    clubAddress: 'Somewhere in a cold place'
  };

  updateEditCache(): void {
    this.editCache = this.clubs.map(clubItem => ({
      edit: false,
      club: {
        ...clubItem.club,
        clubMembers: clubItem.club.clubMembers.map(clubMember => ({
          edit: false,
          ...clubMember
        }))
      }
    }));
    console.log(this.editCache);
  }

  startClubEdit(index: number): void {
    this.editCache[index].edit = true;
  }

  cancelClubEdit(index: number): void {
    this.editCache[index] = {
      club: { ...this.clubs[index].club },
      edit: false
    };
  }

  saveClubEdit(index: number): void {
    Object.assign(this.clubs[index].club, this.editCache[index].club);
    this.editCache[index].edit = false;

    this.clubService.post({...this.clubs[index].club, index})
      .subscribe(data => console.log(data));
  }

  startClubMemberEdit(clubIndex: number, clubMemberIndex: number): void {
    this.editCache[clubIndex].club.clubMembers[clubMemberIndex].edit = true;
  }

  cancelClubMemberEdit(clubIndex: number, clubMemberIndex: number): void {
    this.editCache[clubIndex].club.clubMembers[clubMemberIndex] = {
      clubMember: { ...this.clubs[clubIndex].club.clubMembers[clubMemberIndex] },
      edit: false
    };
  }

  saveClubMemberEdit(clubIndex: number, clubMemberIndex: number): void {
    Object.assign(
      this.clubs[clubIndex].club.clubMembers[clubMemberIndex],
      this.editCache[clubIndex].club.clubMembers[clubMemberIndex]
    );
    this.editCache[clubIndex].club.clubMembers[clubMemberIndex].edit = false;

    this.clubService.post({...this.clubs[clubIndex].club, index: clubIndex})
      .subscribe(data => console.log(data));
  }

  constructor(private clubService: ClubService) { }

  ngOnInit(): void {
    this.clubService.list()
      .subscribe(clubs => {
        this.clubs = clubs.map(club => ({club, expand: false}));
        this.updateEditCache();
      });
  }
}
