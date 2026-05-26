/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Sidebar from './components/Sidebar';
import InteractiveColumns from './components/InteractiveColumns';
import AmbientCanvas from './components/AmbientCanvas';

export default function App() {
  return (
    <div 
      id="root-viewport-container" 
      className="flex flex-col lg:flex-row min-h-screen w-screen overflow-x-hidden bg-portfolio-bg lg:h-screen lg:overflow-hidden select-none"
    >
      {/* 01: Left Fixed Sidebar, controls primary contacts & UTC Clock */}
      <Sidebar />

      {/* 02: Center Interactive Columns, core horizontal expanding portfolio nodes */}
      <InteractiveColumns />

      {/* 03: Right Ambient Area, rendering fluid cosmic coordinates relative to cursor */}
      <AmbientCanvas />
    </div>
  );
}
