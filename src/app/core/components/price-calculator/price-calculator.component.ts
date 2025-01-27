import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-price-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-calculator.component.html',
  styleUrl: './price-calculator.component.scss'
})
export class PriceCalculatorComponent {
  currentStep: number = 0;
  selectedOptions: { [key: string]: string } = {};
  roomCounts: { [key: string]: number } = {};
  costRange = { min: 394345, max: 435855 };

  steps = [
    {
      id: 'step1',
      title: 'Select Your Property Type',
      type: 'options',
      options: [
        { label: 'Residential', value: 'Residential' },
        { label: 'Commercial', value: 'Commercial' },
      ],
    },
    {
      id: 'step2',
      title: 'Specify Construction Stage',
      type: 'options',
      options: [
        { label: 'Constructed', value: 'Constructed' },
        { label: 'Under Construction', value: 'Under Construction' },
      ],
    },
    {
      id: 'step3',
      title: 'Select Your City',
      type: 'options',
      options: [
        { label: 'Lahore', value: 'Lahore' },
        { label: 'Karachi', value: 'Karachi' },
        { label: 'Islamabad', value: 'Islamabad' },
        { label: 'Other', value: 'Other' },
      ],
    },
    {
      id: 'step5',
      title: 'Specify No. of Rooms to Automate',
      type: 'counter',
      options: [
        { label: 'Bedroom', value: 'bedroom' },
        { label: 'Living Room', value: 'livingroom' },
        { label: 'Kitchen', value: 'kitchen' },
        { label: 'Bathroom', value: 'bathroom' },
      ],
    },
    {
      id: 'final-step',
      title: 'Price Calculator',
      type: 'final',
      description: 'Get an estimate of your desired home automation',
      note: 'Please note that the price displayed is just an estimate and actual price may vary after a physical survey of the location.',
    },
  ];


  selectOption(stepId: string, value: string): void {
    this.selectedOptions[stepId] = value;
  }

  updateCounter(roomValue: string, increment: number): void {
    this.roomCounts[roomValue] = (this.roomCounts[roomValue] || 0) + increment;
    if (this.roomCounts[roomValue] < 0) this.roomCounts[roomValue] = 0; // Prevent negative counts
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      this.calculateCost();
    }
  }

  calculateCost(): void {
    let baseCost = 100000; // Base cost
    if (this.selectedOptions['step1'] === 'Commercial') baseCost += 50000;
    if (this.selectedOptions['step2'] === 'Under Construction') baseCost += 20000;
    if (this.selectedOptions['step6'] === 'Upgrade') baseCost += 15000;

    // Add room automation cost
    Object.keys(this.roomCounts).forEach((room) => {
      baseCost += this.roomCounts[room] * 5000; // Assume 5000 PKR per room
    });

    this.costRange = { min: baseCost, max: baseCost + 50000 }; // Dynamic cost range
  }
}
