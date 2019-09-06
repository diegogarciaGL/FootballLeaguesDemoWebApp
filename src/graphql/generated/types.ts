export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Language = {
   __typename?: 'Language',
  _id: Scalars['String'],
  languageId: Scalars['String'],
  name: Scalars['String'],
  isActive: Scalars['Boolean'],
};

export type LanguageInput = {
  _id?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  isActive: Scalars['Boolean'],
};

export type League = {
   __typename?: 'League',
  _id: Scalars['String'],
  name: Scalars['String'],
  country: Scalars['String'],
  teams?: Maybe<Array<Team>>,
};

export type LeagueInput = {
  _id?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  country: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  newLanguage?: Maybe<Language>,
  newLeague: League,
  newTeam: Team,
  newPlayer: Player,
};


export type MutationNewLanguageArgs = {
  input: LanguageInput
};


export type MutationNewLeagueArgs = {
  input: LeagueInput
};


export type MutationNewTeamArgs = {
  input: TeamInput
};


export type MutationNewPlayerArgs = {
  input: PlayerInput
};

export type Player = {
   __typename?: 'Player',
  _id: Scalars['String'],
  name: Scalars['String'],
  shirtNumber?: Maybe<Scalars['Int']>,
  position?: Maybe<Scalars['String']>,
  nationality?: Maybe<Scalars['String']>,
  teamId: Scalars['String'],
  team?: Maybe<Team>,
};

export type PlayerInput = {
  _id?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  shirtNumber?: Maybe<Scalars['Int']>,
  position?: Maybe<Scalars['String']>,
  nationality?: Maybe<Scalars['String']>,
  teamId: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  languages?: Maybe<Array<Maybe<Language>>>,
  leagues: Array<League>,
  league?: Maybe<League>,
  team?: Maybe<Team>,
  teams?: Maybe<Array<Maybe<Team>>>,
  player?: Maybe<Player>,
  players?: Maybe<Array<Player>>,
};


export type QueryLeagueArgs = {
  leagueId: Scalars['String']
};


export type QueryTeamArgs = {
  teamId: Scalars['String']
};


export type QueryTeamsArgs = {
  leagueId: Scalars['String']
};


export type QueryPlayerArgs = {
  playerId: Scalars['String']
};


export type QueryPlayersArgs = {
  teamId: Scalars['String']
};

export type Team = {
   __typename?: 'Team',
  _id: Scalars['String'],
  name: Scalars['String'],
  leagueId: Scalars['String'],
  league: League,
  players?: Maybe<Array<Player>>,
};

export type TeamInput = {
  _id?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  leagueId: Scalars['String'],
};

