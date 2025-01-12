import React from 'react'
import axios from 'axios'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import Sidebar from '../../components/Sidebar'
import "./DoctorDashboard.css"


const DoctorDashboard = () => {











  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className='cards' >
      <div class="card" id='card1'>
        <a class="card1" href="#">
          <p>This is heading</p>
          <p class="small">Card description with lots of great facts and interesting details.</p>
          <div class="go-corner" href="#">
            <div class="go-arrow">
              →
            </div>
          </div>
        </a>
      </div>
      <div class="card">
        <a class="card1" href="#">
          <p>This is heading</p>
          <p class="small">Card description with lots of great facts and interesting details.</p>
          <div class="go-corner" href="#">
            <div class="go-arrow">
              →
            </div>
          </div>
        </a>
      </div>
        <div class="card">
        <a class="card1" href="#">
          <p>This is heading</p>
          <p class="small">Card description with lots of great facts and interesting details.</p>
          <div class="go-corner" href="#">
            <div class="go-arrow">
              →
            </div>
          </div>
        </a>
      </div>
      </div>



    </div>
  )
}

export default DoctorDashboard