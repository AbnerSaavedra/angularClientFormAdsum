import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactoService } from 'src/app/services/contacto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  contacto: any;
  submitted = false;
  title = 'Contacto de soporte';

  supportContact = {

    nombreC: "",
    nombreE: "",
    email: "",
    telefono: "",
    categoria: "",
    mensaje: "",

  };

  categorias = ["Facturación", "Soporte técnico", "Ventas", "Información general"]

  constructor(private formBuilder: FormBuilder,
              private contactoService: ContactoService) { 

    const PAT_NAME = "^[a-zA-Z ]{2,20}$";

      this.contacto = this.formBuilder.group({
          nombreC: ['', [Validators.required, Validators.pattern(PAT_NAME)]],            
          nombreE: ['', Validators.required],            
          email: ['', [Validators.required, Validators.email]],
          telefono: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],            
          categoria: ['', Validators.required],
          mensaje: ['', [Validators.required, Validators.minLength(6)]]
      });

}
 
  ngOnInit() {

  }

  get f() { 
    return this.contacto.controls; 
  }

  saveSupportContact(): void {

    this.submitted = true;

    if(this.contacto.valid){

      const data = {

        nombreC: this.contacto.value['nombreC'],
        nombreE: this.contacto.value['nombreE'],
        email: this.contacto.value['email'],
        telefono: this.contacto.value['telefono'],
        categoria: this.contacto.value['categoria'],
        mensaje: this.contacto.value['mensaje'],
  };

      console.log("Data: "+JSON.stringify(data));

      this.contactoService.createContact(data)
      .subscribe(
        response => {
          console.log("Respuesta contacto: "+JSON.stringify(response));
          
          Swal.fire(
            {
              icon: 'success',
              title: 'Bien',
              text: 'Registro exitoso'
            });

            this.contacto.reset();
            this.submitted = false;
        },
        error => {
          console.log("Error: "+JSON.stringify(error));
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error',
          });
        });
    }else{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formulario no válido',
      });
    }
  }

  clearForm():void{

    this.supportContact = {

      nombreC: "",
      nombreE: "",
      email: "",
      telefono: "",
      categoria: "",
      mensaje: "",
  
    };

    //this.submitted = false;

  }
}
