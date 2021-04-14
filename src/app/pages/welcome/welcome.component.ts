import { Component, OnInit } from '@angular/core';
import {ClubService} from '~services/club-service/club.service';
import {Club} from '~models/club';
import {NzTableSortFn} from 'ng-zorro-antd/table';


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

  alphabeticClubSorter = (columnName: string): NzTableSortFn => {
    return (a: any, b: any) => a.club[columnName].localeCompare(b.club[columnName]);
  }

  numericClubSorter = (columnName: string): NzTableSortFn => {
    return (a: any, b: any) => b.club[columnName] - a.club[columnName];
  }

  alphabeticSorter = (columnName: string): NzTableSortFn => {
    return (a: any, b: any) => a[columnName].localeCompare(b[columnName]);
  }

  numericSorter = (columnName: string): NzTableSortFn => {
    return (a: any, b: any) => b[columnName] - a[columnName];
  }

  resetEditCache(updateEdit = true): void {
    this.editCache = this.clubs.map((clubItem, clubIndex) => ({
      edit: updateEdit ? false : this.editCache[clubIndex].edit,
      club: {
        ...clubItem.club,
        clubMembers: clubItem.club.clubMembers.map((clubMember, clubMemberIndex) => ({
          edit: updateEdit ? false : this.editCache[clubIndex].club.clubMembers[clubMemberIndex].edit,
          ...clubMember
        }))
      }
    }));
    console.log(this.editCache);
  }

  private resetClubEditCache(clubIndex: number): void {
    this.editCache[clubIndex] = {
      edit: this.editCache[clubIndex].edit,
      club: {
        ...this.editCache[clubIndex].club,
        clubMembers: this.editCache[clubIndex].club.clubMembers.map((clubMember: any, clubMemberIndex: number) => ({
          edit: this.editCache[clubIndex].club.clubMembers[clubMemberIndex].edit,
          ...clubMember
        }))
      }
    };
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

    this.clubService.post(this.clubs.map(clubItem => clubItem.club))
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

    this.clubService.post(this.clubs.map(clubItem => clubItem.club))
      .subscribe(data => console.log(data));
  }

  constructor(private clubService: ClubService) { }

  ngOnInit(): void {
    this.clubService.list()
      .subscribe(clubs => {
        this.clubs = clubs.map(club => ({club, expand: false}));
        this.resetEditCache();
      });
  }

  reSortEditCache(columnName: string, dataType: string, direction: string | null, clubIndex: number = -1): any {
    if (clubIndex > -1) {
      if (direction) {
        console.log('kk dir');
        if (dataType === 'string') {
          console.log('kk str');
          this.editCache[clubIndex].club.clubMembers = this.editCache[clubIndex].club.clubMembers
            .sort(this.alphabeticSorter(columnName));
        } else if (dataType === 'number') {
          console.log('kk num');
          console.log(this.editCache[clubIndex].club.clubMembers.map((data: any) => data.age));
          this.editCache[clubIndex].club.clubMembers = this.editCache[clubIndex].club.clubMembers
            .sort(this.numericSorter(columnName));
        }
        if (direction === 'descend') {
          this.editCache[clubIndex].club.clubMembers.reverse();
        }
        console.log(this.editCache[clubIndex].club.clubMembers.map((data: any) => data.age));
      } else {
        this.resetClubEditCache(clubIndex);
      }
      console.log(this.editCache[clubIndex].club.clubMembers.map((data: any) => data.age));
    } else  {
      if (direction) {
        if (dataType === 'string') {
          this.editCache = this.editCache.sort(this.alphabeticClubSorter(columnName));
        } else if (dataType === 'number') {
          this.editCache = this.editCache.sort(this.numericClubSorter(columnName));
        }
        if (direction === 'descend') {
          this.editCache.reverse();
        }
      } else {
        this.resetEditCache(false);
      }
    }
    console.log(columnName);
  }
}
