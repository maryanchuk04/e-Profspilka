import { first, Subject, takeUntil } from 'rxjs';
import { Discount } from 'src/app/models/Discount';
import { DiscountService } from 'src/app/services/discount.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextFieldComponent } from '../../../ui/text-field/text-field.component';

@Component({
    selector: 'app-update-discount',
    templateUrl: './update-discount.component.html',
    imports: [TextFieldComponent]
})
export class UpdateDiscountComponent implements OnInit, OnDestroy {
	$destroy = new Subject<void>();
	discount: Discount;

	constructor(private discountService: DiscountService, private actRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.actRoute.params.pipe(takeUntil(this.$destroy)).subscribe(({ id }) => {
			this.discountService
				.getById(id)
				.pipe(first())
				.subscribe((res) => {
					console.log(res);
					this.discount = res;
				});
		});
	}

	ngOnDestroy(): void {
		this.$destroy.next();
		this.$destroy.complete();
	}
}
