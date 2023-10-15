import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  miFormulario: FormGroup;

  constructor(private fb: FormBuilder, 
   // private http: HttpClient
   ) 
    {
    this.miFormulario = this.fb.group({
      nombreCompleto: ['', [Validators.required,Validators.maxLength(100)] ],
      nombreEmpresa:['',[Validators.required,Validators.maxLength(100)] ],
      correo: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      telefono: ['', [ Validators.required, Validators.compose([Validators.minLength(10),Validators.maxLength(10)]), Validators.pattern('^[0-9]+$') ]  ],
      categoria:['',[ Validators.required]],
      msg: ['', [Validators.required, Validators.maxLength(300)]]

    });
  }

  get nombreCompletoNoValido() {
    const nombreCompletoControl=this.miFormulario.get('nombreCompleto');
    return nombreCompletoControl && nombreCompletoControl.invalid && nombreCompletoControl.touched;
  }

  get nombreEmpresaNoValido(){
    const nombreEmpresaControl=this.miFormulario.get('nombreEmpresa');
    return nombreEmpresaControl && nombreEmpresaControl.invalid && nombreEmpresaControl.touched;
  }

  get correoNoValido(){
    const correoControl=this.miFormulario.get('correo');
    return correoControl && correoControl.invalid && correoControl.touched;
  }
  
  get telefonoNoValido(){
    const telefonoControl=this.miFormulario.get('telefono');
    return telefonoControl && telefonoControl.invalid && telefonoControl.touched;
  }

  get categoriaNoValida() {
     const categoriaControl = this.miFormulario.get('categoria');
    return categoriaControl && categoriaControl.invalid && categoriaControl.hasError('required') && categoriaControl.touched;
  }
  
  

  get mensajeNoValido(){
    const msjControl=this.miFormulario.get('msg');
    return msjControl && msjControl.invalid && msjControl.touched;
  }
  



  guardar(): void {
    console.log( this.miFormulario );

    if ( this.miFormulario.invalid ) {
      alert('Registro no es valido. Por favor, verifique sus datos')

      return Object.values( this.miFormulario.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
 
      });
     
    }else{
      this.submitForm();
    }
  }



   submitForm() {
     alert('enviando datos al servidor');
  //   const formData = this.miFormulario.value;
  //   this.http.post('http://localhost:3000/guardar-datos', formData).subscribe(
  //     (response) => {
  //       console.log('Datos enviados con éxito:', response);
 
  //     },
  //     (error) => {
  //       console.error('Error al enviar datos:', error);
  //     }
  //   );
   }
}

