// Angular Import
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
// Material Import
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
// Ngrx Import
import {Store} from "@ngrx/store";
// Game Import
import {PreGameService} from "../pre-game.service";
import {PreGame} from "../stores/pre-game-store/pre-game";
import {PreGameState} from "../stores/pre-game-store/pre-game.state";
import {selectPreGameGames, selectPreGamePublicGames} from "../stores/pre-game-store/pre-game.selector";
import {flushState} from "../stores/pre-game-store/pre-game.actions"
// Rxjs Import
import {Observable} from "rxjs";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-join-game',
  templateUrl: './dialog-join-game.component.html',
  styleUrls: ['./dialog-join-game.component.scss']
})
export class DialogJoinGameComponent implements OnInit {
  PublicGames: Observable<Array<PreGame>> = new Observable<Array<PreGame>>();
  Games: Observable<Array<PreGame>> = new Observable<Array<PreGame>>();
  gamesForm: FormGroup = new FormGroup({
    gameId: new FormControl(""),
    playerName: new FormControl(""),
    gameSelect: new FormControl(""),
  })
  isGameIdOnGames: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogJoinGameComponent>,
    private preGameService: PreGameService,
    protected store: Store<PreGameState>,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.Games = this.preGameService.getGames()
    this.PublicGames = this.store.select(selectPreGamePublicGames)
    this.Games = this.store.select(selectPreGameGames)
  }

  joinGame(): void {
    this.preGameService.flushGamesListSocket();
    // If the game is Selected (Public Game) Just try to join the game
    if (this.gamesForm.value.gameSelect) {
      this.preGameService.JoinGame(
        {
          gameId: this.gamesForm.value.gameSelect,
          playerName: this.gamesForm.value.playerName
        },
        "dialog"
        )
    } 
    else {
      // check if the gameId exist (Private Game access)
      this.Games.pipe(first()).subscribe(games => {
        if (games.findIndex(game => game.gameId === this.gamesForm.value.gameId) !== -1){
            this.preGameService.JoinGame({
                    gameId: this.gamesForm.value.gameId,
                    playerName: this.gamesForm.value.playerName,
            },
            "dialog")
        }
        // If not return an error 
        else {
            this.snackBar.open("L'id de la game est introuvable", "Fermer", {
                 duration: 6000,
                 verticalPosition: "top",
                 horizontalPosition: "center"
               });
          }
  
        })
    }
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.store.dispatch(flushState())
    this.preGameService.flushGamesListSocket()
    this.dialogRef.close();
  }

  // Disabled Submit Form button if no value
  isDisabled(): boolean {
    let isDisabled: boolean = this.gamesForm.value.gameId && this.gamesForm.value.playerName || this.gamesForm.value.gameSelect && this.gamesForm.value.playerName ? false : true
    return isDisabled
  }

}
