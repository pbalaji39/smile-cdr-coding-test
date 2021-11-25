import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, ResourceDetail, PatientDetail, Patient } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public PatientDetails: Array<PatientDetail> = [];
  public patients: Array<Patient> = [];
  public ResourceDetails: Array<ResourceDetail> = [];
  private routeSub: Subscription = new Subscription();
  private patientSub: Subscription = new Subscription();

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      if (queryParams['given'] || queryParams['family']) {
        if (queryParams['given'] && queryParams['family']) {
          this.searchPatients(queryParams['given'], queryParams['family'])
          return
        }
        if (queryParams['given']) {
          this.searchPatients(queryParams['given'])
          return
        }
        if (queryParams['family']) {
          this.searchPatients('', queryParams['family'])
          return
        }

      }
      else {
        this.searchPatients();
      }
    });
  }

  searchPatients(given?: string, family?: string): void {
    this.patientSub = this.httpService
      .getPatientList(given, family)
      .subscribe((patientList: APIResponse<Patient>) => {
        this.patients = patientList.entry
        this.ResourceDetails = this.patients.map(x => x.resource)
        this.PatientDetails = this.ResourceDetails.map(x => {
          return {
            id: x.id,
            firstname: (() => { try { return x.name[0].given.toString() } catch { return ' ' } })(),
            lastname: (() => { try { return x.name[0].family.toString() } catch { return ' ' } })(),
            birthdate: x.birthDate,
            address: (() => { try { let o = x.address[0]; return Object.keys(o).map(x => x + ":" + o[x]).join("\n") } catch { return ' ' } })(),
            gender: (() => { try { return x.gender } catch { return ' ' } })(),
            phoneNumber: (() => { try { return [...x.telecom].filter(x => x.system == "phone")[0].value } catch { return '' } })(),
            isValidCell: true
          }
        })
        .sort((a, b) => (a.firstname + a.lastname > b.firstname + b.lastname) ? 1 : ((b.firstname + b.lastname > a.firstname + a.lastname) ? -1 : 0))
        .map(x=>{
          let name:string;
          name=x.firstname+x.lastname
          if(
            !!name.match(/(\d)|^[\s]*$/igm) 
            ){
              x.isValidCell=false;
              return x
            }else{
              return x
            }
        })
      });
  }

  openPatientDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.patientSub) {
      this.patientSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
