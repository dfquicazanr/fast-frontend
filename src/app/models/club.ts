import {ClubMember} from './club-member';

export interface Club {
  index?: number;
  clubMembers: ClubMember[];
  clubName: string;
  clubAddress: string;
}

export const clubSnakeToCamel = (snakeClub: any): Club => {
  return {
    index: snakeClub.index,
    clubMembers: snakeClub.club_members,
    clubName: snakeClub.club_name,
    clubAddress: snakeClub.club_address
  };
};

export const clubCamelToSnake = (camelClub: Club): any => {
  return {
    index: camelClub.index,
    club_members: camelClub.clubMembers,
    club_name: camelClub.clubName,
    club_address: camelClub.clubAddress
  };
};
