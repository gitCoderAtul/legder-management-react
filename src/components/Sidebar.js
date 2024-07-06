import React from 'react'
import { Link } from 'react-router-dom'
 
export default function Sidebar() {
  return (
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
    {/* <!-- Brand Logo --> */}
    <a href="#" class="brand-link text-center">
     
      <span class="brand-text font-weight-light">Legder Management</span>
    </a>

    {/* <!-- Sidebar --> */}
    <div class="sidebar">
      {/* <!-- Sidebar user panel (optional) --> */}
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
            {/* <img src='assets/img/user2-160x160.jpg' class="img-circle elevation-2" alt="User Image" ></img> */}
          {/* <img src="assets/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" /> */}
        </div>
        <div class="info">
          <Link to='/' className='d-block'> Alexander Pierce </Link> 
        </div>
      </div>

      {/* <!-- SidebarSearch Form --> */}
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"/>
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Sidebar Menu --> */}
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          
          
            <li class="nav-item">
          <Link to="/" class="nav-link active">
          <i class="nav-icon fas fa-tachometer-alt"></i>  
              <p>
                Home 
              </p>
           </Link>
          </li>

          <li class="nav-item">
          <Link to="/search-details" class="nav-link">
          <i class="nav-icon fas fa-tachometer-alt"></i>  
              <p>
                Search Details 
              </p>
           </Link>
          </li>
          
          <li class="nav-item">
          <Link to="/add-user" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Users
              </p>
           </Link>
          </li>
          <li class="nav-item">
          <Link to="/add-particular" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Particular
              </p>
           </Link>
          </li>
          <li class="nav-item">
          <Link to="/add-details" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                User Details
                <span class="right badge badge-danger">New</span>
              </p>
            </Link>
          </li>
          {/* <li class="nav-item">
          <Link to="/App/AssignCourse" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Assign Course
                <span class="right badge badge-danger">New</span>
              </p>
            </Link>
          </li> */}
         
        </ul>
      </nav>
      {/* <!-- /.sidebar-menu --> */}
    </div>
    {/* <!-- /.sidebar --> */}
  </aside>
  )
}
