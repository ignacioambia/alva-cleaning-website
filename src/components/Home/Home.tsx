import { Autocomplete, Button, TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { Moment } from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import * as React from "react";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Service } from "../../interfaces/Service";

import "./Home.scss";

interface HomeProps {}

interface HomeState {
  pickerOptionOpen: boolean;
  timePickerFilled: boolean;
  addresses: any[];
  servicePayload: Partial<Service>;
}

class Home extends React.Component<HomeProps, HomeState> {
  state = {
    pickerOptionOpen: false,
    timePickerFilled: false,
    addresses: [],
    servicePayload: {
      client_name: "",
      address: {
        name: "",
        lat: 0,
        lng: 0,
        place_id: "",
      },
      date: new Date(),
      phone: "",
      reference: "",
    },
  };

  timePickerRef = React.createRef<any>();
  addressRef = React.createRef<any>();

  getDateTimeInput(props: any) {
    return (
      <div className="datetime">
        <TextField {...props} fullWidth={true} label="Fecha"></TextField>
      </div>
    );
  }

  searchAddress = (address: string) => {
    axios
      .get(
        `http://localhost:8000/maps/api/place/autocomplete/json?input=${address}`
      )
      .then(({ data }) => {
        const formattedAddresses = data.predictions.map((e: any) => {
          return { ...e, label: e.description };
        });
        this.setState({ addresses: formattedAddresses });
      });
  };

  handleInputChange = ({
    inputName,
    value,
  }: {
    inputName: keyof Service;
    value: any;
  }) => {
    const { servicePayload } = this.state;
    servicePayload[inputName] = value;
    // servicePayload["date"] = null;
    this.setState({ servicePayload });
  };

  handleDateChange = (e: any) => {
    this.handleInputChange({ inputName: "date", value: new Date(e) });
    this.timePickerRef.current.setState({ value: null });
  };

  handleTimeChange = (e: Moment) => {
    const { servicePayload } = this.state;
    servicePayload.date.setHours(e.hour());
    servicePayload.date.setMinutes(e.minutes());

    this.setState({ timePickerFilled: e != null, servicePayload });
  };

  handleAddressChange = async (e: React.SyntheticEvent, value: any) => {
    console.log("e is: ", value);
    const { location } = await this.getPlaceIdDetails(value.place_id);
    const { servicePayload } = this.state;
    servicePayload.address = {
      name: value.description,
      lat: location.lat,
      lng: location.lng,
      place_id: value.place_id,
    };
    this.setState({ servicePayload });
  };

  createService = () => {
    axios
      .post("http://localhost:8000/services", this.state.servicePayload)
      .then(({ data }) => {});
  };

  getPlaceIdDetails = async (placeId: string) => {
    return (
      await axios.get(
        `http://localhost:8000/maps/api/place/details/json?place_id=${placeId}`
      )
    ).data.result.geometry;
  };

  render() {
    const { pickerOptionOpen, timePickerFilled, addresses, servicePayload } =
      this.state;
    return (
      <div className="form-wrapper">
        <TextField
          onChange={(e) =>
            this.handleInputChange({
              inputName: "client_name",
              value: e.target.value,
            })
          }
          fullWidth={true}
          label="Nombre"
        />
        <TextField
          fullWidth={true}
          label="Teléfono"
          onChange={(e) =>
            this.handleInputChange({
              inputName: "phone",
              value: e.target.value,
            })
          }
        />
        <Datetime
          onChange={this.handleDateChange}
          renderInput={this.getDateTimeInput}
          timeFormat={false}
        />
        <TimePicker
          disabled={servicePayload.date == null}
          ref={this.timePickerRef}
          onChange={this.handleTimeChange}
          className={`time-picker ${timePickerFilled ? "filled" : ""}`}
          onOpen={() => this.setState({ pickerOptionOpen: true })}
          onClose={() => this.setState({ pickerOptionOpen: false })}
          open={pickerOptionOpen}
          showSecond={false}
          minuteStep={30}
        />
        <Autocomplete
          ref={this.addressRef}
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={addresses}
          filterOptions={(x) => x}
          onChange={this.handleAddressChange}
          renderInput={(params) => (
            <TextField
              onChange={({ target }) => this.searchAddress(target.value)}
              {...params}
              multiline
              label="Dirección"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />

        <TextField
          fullWidth={true}
          multiline
          rows={3}
          onChange={(e) =>
            this.handleInputChange({
              inputName: "reference",
              value: e.target.value,
            })
          }
          label="Referencias de localidad (opcional)"
        />
        <div className="btn-wrapper">
          <Button
            onClick={this.createService}
            disabled={false}
            variant="contained"
          >
            Pedir servicio
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;