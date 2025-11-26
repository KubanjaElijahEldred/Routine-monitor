import React from 'react';
import TeamMembers from './TeamMembers';

const Team = () => {
  console.log('Team component is rendering');
  return (
    <div>
      <h1>Team Page Test</h1>
      <TeamMembers />
    </div>
  );
};

export default Team;
