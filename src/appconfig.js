
const appConfig = {
  settings: {
    logindata: {
      loggedin: false,
      token: '',
      expires_in: '',
      id: '',
      name: '',
      email: '',
      role: ''
    },
    http: {
      api: 'http://localhost:3003/api/v1',
      // api: 'http://skillie.vanillanetworks.com:3003/api/v1',
      headers: {
        'Accept': 'application/json', 
        "Content-Type" : "application/json"
      }
    },
    menu: [
      {
        name: 'Dashboard',
        ico: 'fa-home',
        active: true,
        link: '/'
      },
      {
        name: 'Vouchers',
        ico: 'fa-ticket',
        active: false,
        link: '/vouchers'
      },
      {
        name: 'Trainings',
        ico: 'fa-graduation-cap',
        active: false,
        link: '/trainings'
      },
      {
        name: 'Trainees',
        ico: 'fa-users',
        active: false,
        link: '/trainees'
      },
      {
        name: 'Certificates',
        ico: 'fa-clone',
        active: false,
        link: '/certificates'
      },
      {
        name: 'Users',
        ico: 'fa-user-o',
        active: false,
        link: '/users'
      },
      {
        name: 'Settings',
        ico: 'fa-cog',
        active: false,
        link: '/settings'
      }
    ]
  },
  trainings: {
    Trainings: [],
    TrainingById: {}
  },
  trainingproviders: {
    TrainingProviders: [],
    TrainingProvidersById: {}
  },
  users: {
    Users: [],
    UsersById: {}
  },
  roles: {
    Roles: [],
    RolesById: {}
  },
  vouchers: {
    VouchersByTrainings: []
  }
  
}
export default appConfig