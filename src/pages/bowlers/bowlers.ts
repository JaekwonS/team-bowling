import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { NavParams } from "ionic-angular";
import { AlertController } from "ionic-angular";

import "rxjs/add/operator/map";
import { DatabaseProvider } from "../../providers/database/database";
import { TeamsPage } from "../teams/teams";

@Component({
  selector: "page-bowlers",
  templateUrl: "bowlers.html"
})
export class BowlersPage {
  bowlers: any[];
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private database: DatabaseProvider
  ) {
    this.bowlers = [
      { label: "A", name: "A", gender: "male", average: 257 },
      { label: "B", name: "B", gender: "male", average: 100 },
      { label: "C", name: "C", gender: "male", average: 175 },
      { label: "D", name: "D", gender: "female", average: 200 }
    ];
  }

  //refreshes page
  doRefresh(refresher) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
      this.GetAllBowlers();
    }, 2000);
  }

  private ListBowler: any;

  //stores array of all bowler id's that are checked in the list
  checked = [];

  ionViewDidLoad() {
    this.GetAllBowlers();
  }
  ionViewWillEnter() {
  }

  //adds checked names to checked[] array and if unchecked, removes it from checked[] array
  addCheckbox(event, checkbox: String) {
    if (event.checked) {
      console.log(checkbox + " checked");
      this.checked.push(checkbox);

      //change date value in bowler table for checked bowler
      this.database.PresentBowler(checkbox);
    } else {
      console.log(checkbox + " unchecked");
      let index = this.removeCheckedFromArray(checkbox);

      //change date value in bowler table for unchecked bowler
      this.database.AbsentBowler(checkbox);
      this.checked.splice(index, 1);
    }
  }

  verifyList(date: any){
    console.log("date: "+date);
    if(date == 1){
      return true;
    }else{
      return false;
    }
  }

  //removes checked element from checked[] array
  removeCheckedFromArray(checkbox: String) {
    return this.checked.findIndex(category => {
      return category === checkbox;
    });
  }

  //Empties checked[] array
  emptyCheckedArray() {
    this.checked = [];
  }

  //Log elements of checked[] array
  getCheckedBoxes() {
    for(var i=0; i<this.ListBowler.length; i++){
      if(this.ListBowler[i]["bowler_date"] == 1 && this.checked.length != this.ListBowler.length){
        this.checked.push(this.ListBowler[i]["bowler_id"]);
      }
    }
    console.log(this.checked);
  }

  //stores all bowlers in the database in the ListBowler array
  GetAllBowlers() {
    this.checked = [];
    this.database.GetAllBowlers().then(
      (data: any) => {
        console.log(data + "\nI AM WORKING for Bowlers");
        this.ListBowler = data;
        this.getCheckedBoxes();
      },
      error => {
        console.log(error);
      }
    );
  }

  //Generates an alert prompt to create a new bowler. User enters bowler information and then this information is stored in the bowler table.
  AddBowlerPrompt() {
    const prompt = this.alertCtrl.create({
      title: "Add Bowler",
      message: "Fill out the following boxes to enter your bowler",
      inputs: [
        {
          name: "Name",
          placeholder: "Bowler name"
        },
        {
          name: "Average",
          placeholder: "Average (Enter 0 if none)"
        },
        {
          name: "Handicap",
          placeholder: "Handicap amount"
        }
        // {
        //   name: 'AverageScore',
        //   placeholder: 'Average Score (Ex. 200)'
        // },
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Male",
          handler: data => {
            console.log(JSON.stringify(data));
            console.log((data.Average % 1) + " modded");
            if (
              data.Average >= 0 &&
              data.Average <= 300 &&
              data.Handicap >= 0 &&
              data.Handicap <= 30 &&
              data.Average != "" &&
              data.Handicap != "" &&
              data.Name != "" &&
              data.Handicap % 1 == 0
            ) {
              this.database.CreateBowler(
                data.Name,
                "Male",
                data.Average,
                data.Handicap,
                null
              );
            } else {
              prompt.setMessage("Invalid Entry");
              return false;
            }
          }
        },
        {
          text: "Female",
          handler: data => {
            console.log(JSON.stringify(data));
            if (
              data.Average >= 0 &&
              data.Average <= 300 &&
              data.Handicap >= 0 &&
              data.Handicap <= 30 &&
              data.Average != "" &&
              data.Handicap != "" &&
              data.Name != "" &&
              data.Average % 1 == 0
            ) {
              this.database.CreateBowler(
                data.Name,
                "Female",
                data.Average,
                data.Handicap,
                null
              );
            } else {
              prompt.setMessage("Invalid Entry");
              return false;
            }
          }
        }
      ]
    });
    prompt.present(),
      //refreshes list of bowlers
      prompt.onDidDismiss(() => {
        this.GetAllBowlers();
      });
  }

  //Alert user if selected number of bowlers do not evenly fill out teams of 3
  presentAlert1() {
    let alert = this.alertCtrl.create({
      title: "Warning",
      subTitle: "You currently have selected "+this.checked.length+" bowlers! Add 2 bowlers or remove 1 bowler to start game!",
      buttons: ["Dismiss"]
    });
    alert.present();
  }

  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: "Warning",
      subTitle: "You currently have selected "+this.checked.length+" bowlers! Add 1 bowler or remove 2 bowlers to start game!",
      buttons: ["Dismiss"]
    });
    alert.present();
  }

  //console logs values in checked[] array, goes to teams page and shares checked[] array to teams page
  showNextPage() {
    if (
      (this.checked.length % 3 >= -0.1 &&
        this.checked.length % 3 <= 0.1 &&
        this.checked.length != 0) ||
      (this.checked.length >= 3 &&
        this.checked.length % 3 >= -0.1 &&
        this.checked.length % 3 <= 0.1)
    ) {
      this.navCtrl.push(TeamsPage, {
        checked: this.checked
      });
    } else if(this.checked.length%3 >= 0.9 && this.checked.length%3 <= 1.1){
      //Alerts user if teams cannot be made with 3 people
      this.presentAlert1();
    } else {
      this.presentAlert2();
    }
  }

  deleteBowler() {
    console.log(
      "Deleting " + this.checked.length + " bowlers from the database."
    );
    let numBowlersToDelete = this.checked.length;
    for (var i = 0; i < numBowlersToDelete; i++) {
      console.log("Bowler deleted: " + this.checked[i]);
      this.database.DeleteBowler(this.checked[i]); //key value pair
      this.GetAllBowlers();
    }
  }
}
