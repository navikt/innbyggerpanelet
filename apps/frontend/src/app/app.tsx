import React, { useEffect, useState } from 'react';
import { Message } from '@innbyggerpanelet/api-interfaces';
import { CreateInsight } from './containers/createInsight/CreateInsight';

import "./app.module.scss"

export const App = () => {

  return (
    <>
      <CreateInsight name="Hello"/>
    </>
  );
};

export default App;
