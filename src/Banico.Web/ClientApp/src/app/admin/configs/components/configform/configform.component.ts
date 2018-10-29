import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigsService } from '../../main/configs.service';
import { Config } from '../../../../entities/config';

@Component({
    selector: 'configsAdmin',
    templateUrl: './configform.component.html',
    providers: [ConfigsService]
})
export class ConfigFormComponent implements OnInit {
    isSuccessful: boolean;
    isRequesting: boolean;
    errors: string;  
    public configs: Config[];
    public config: Config;

    configForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        module: [''],
        value: ['', Validators.required]
      });

    constructor(
        private configsService: ConfigsService,
        private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute
        ) {
    }

    ngOnInit() {
    }

    public save() {
        this.configsService.addOrUpdate(
            this.configForm.value['id'],
            this.configForm.value['name'],
            this.configForm.value['module'],
            this.configForm.value['value']
        )
        .finally(() => this.isRequesting = false)
        .subscribe(
        result  => {
            this.isSuccessful = true;
        },
        errors =>  this.errors = errors);
    }

    private saveSuccess(config: Config) {
        if (config.id != '0') {
            alert('Saved.');
        }
        else {
            alert('Save failed.');
        }
    }

    private SaveResponse(data: any) {
        if (data != null) {
            if (data.value != null) {
                if (data.value == '0') {
                    alert('Saved.');
                } else {
                    alert('Save failed.');
                }
            } else {
                alert('Save failed.');
            }
        } else {
            alert('Save failed.');
        }
    }
}
