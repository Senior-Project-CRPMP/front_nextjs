import React from 'react';
import CustomPieChart from '../component/PieChart';
import CustomGaugeChart from '../component/GaugeChart';
import MemberContributionChart from '../component/BarChart';

function Board() {
    return (
        <div>
        <div className="flex flex-row justify-around items-start">
         <div> <CustomPieChart/> </div>
         <div className='ml-10 mt-5'> <CustomGaugeChart/> </div>
        </div>
        <div><MemberContributionChart/></div>
        </div>
        
    );
}

export default Board;