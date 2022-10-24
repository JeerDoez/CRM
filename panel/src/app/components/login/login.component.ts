import { Component, OnInit } from '@angular/core';//import { EmailValidator } from '@angular/forms';
import { ColaboradorService } from 'src/app/services/colaborador.service';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {
    email: '',
    password: ''
  };

  constructor(
    private _colaboradorService:ColaboradorService
  ) { }

  ngOnInit(): void {
  }

  login(){     // console.log(this.user );//muestra los datos del formulario
    if (!this.user.email) {
      $.notify('Ingrese su correo', { 
        type: 'danger',
        spacing: 10,                    
        timer: 2000,
        placement: {
            from: 'top', 
            align: 'right'
        },
        delay: 1000,
        animate: {
            enter: 'animated ' + 'bounce',
            exit: 'animated ' + 'bounce'
        }
      });
    }else if (!this.user.password) {
      $.notify('Ingrese su contraseña', { 
        type: 'danger',
        spacing: 10,                    
        timer: 2000,
        placement: {
            from: 'top', 
            align: 'right'
        },
        delay: 1000,
        animate: {
            enter: 'animated ' + 'bounce',
            exit: 'animated ' + 'bounce'
        }
      });
    } 
    else{
     console.log(this.user);
     
      this._colaboradorService.login_admin(this.user).subscribe(
        response=>{
          console.log(response);
          if (response.data == undefined) {
            $.notify(response.message, { 
              type: 'danger',
              spacing: 10,                    
              timer: 2000,
              placement: {
                  from: 'top', 
                  align: 'right'
              },
              delay: 1000,
              animate: {
                  enter: 'animated ' + 'bounce',
                  exit: 'animated ' + 'bounce'
              }
            });
          }else{
           localStorage.setItem('token',response.token);
            localStorage.setItem('user',JSON.stringify(response.data));
          
          }
        }
      );
    } 
  }

}
