import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(async () => {
    app = new AppComponent();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
