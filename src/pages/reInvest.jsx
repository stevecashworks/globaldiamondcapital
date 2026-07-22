import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  Container,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../components/header";
import Footer from "../components/footer";
import ErrorModal from "../components/errorsModal";

import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import {
  selectUserDetails,
} from "../state/slices/userSlice";
import { X } from "lucide-react";

const ResponsiveContainer = styled(Container)`
  max-width: 700px;
  margin: 40px auto;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
`;

const Value = styled.div`
  font-size: 17px;
  margin-bottom: 15px;
`;

const ReInvestPage = () => {
  const token = localStorage.getItem("support_token");

  const navigate = useNavigate();
  const params= new URLSearchParams(window.location.search)
  
  const id  = params.get("id");
  console.log(id)

  const userDetails = useSelector(selectUserDetails);

  const [wallet, setWallet] = useState("spot_balance");

  const [investment, setInvestment] = useState(undefined);

  const [loading, setLoading] = useState(true);
  const [duration, setDuration]=useState("")
  const [investing, setInvesting] = useState(false);
  const [roi, setRoi]=useState("")

  const [errors, setErrors] = useState([]);
   const plans=[
    {
    id: "starter",
    title:"Starter Plan",
    roi: 10,
    min: 20 ,
    max: 999,
    duration: 24,
    reinvestment: "Reinvestment Supported",
  },
  {
    id: "premium",
    title:"Premium plan",
    roi: 25,
    min: 1000,
    max: 9999,
    duration: 48,
    reinvestment: "Reinvestment Supported",
  },
  {
    id: "ultimate",
    title:"Ultimate Plan",
    roi: 40,
    min: 40000,
    max: 99999,
    duration: 168,
    reinvestment: "Reinvestment Supported",
  },
  {
    id: "standard",
    title:"Standard Plan",
    roi: 25,
    min: 500,
    max: 999 ,
    duration: 48 ,
    reinvestment: "Reinvestment Supported",
  },
  // {
  //   title: "Annual Plan",
  //   roi: 15 ,
  //   min: "5000 USD",
  //   max: "9999 USD",
  //   duration: "1 Year Plan",
  //   reinvestment: "Reinvestment Supported",
  // },
  {
    id: "corporate",
    title:"Corporate Plan",
    roi: 50,
    min: 100000,
    max:9999999999,
    duration: 720,
    reinvestment: "Reinvestment Supported",
  },
  ]
  
  useEffect(()=>{
    console.log(typeof investment)
    if(investment){
    const plan= plans.find(x=>{
      return x.id===investment.plan
    })
    if(plan){
      setRoi(plan.roi)
      setDuration(plan.duration)
    }
    }
  },[investment])


  const balanceMap = {
    spot_balance: Number(userDetails.balance),
    earnings: Number(userDetails.totalEarnings),
    referral_bonus: Number(userDetails.referralBonus),
  };

  const currentBalance = useMemo(() => {
    return balanceMap[wallet] || 0;
  }, [wallet, userDetails]);


  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchData(
      `${developmentApiEntryPoint}/requests/getInvestment/${id}`,

      (data) => {
        setInvestment(data.result);
        setLoading(false);
      },

      (message) => {
        toast.error(message || "Unable to fetch investment.");
        // navigate("/dashboard");
      },

      "GET",

      null,

      token
    );
  }, []);
  console.log({investment})

  const reinvest = () => {
    if (!investment) return;

    const validationErrors = [];

    if (currentBalance < investment.amount) {
      validationErrors.push("Insufficient balance.");
    }

    setErrors(validationErrors);

    if (validationErrors.length) return;

    setInvesting(true);
    const {_id,approvedDate,createdAt,updatedAt, ...others}=investment
    console.log({others})
    fetchData(
      `${developmentApiEntryPoint}/requests/invest`,

      () => {
        toast.success("Reinvestment request submitted.");

        navigate("/");
      },

      (message) => {
        toast.error(message || "Unable to process reinvestment.");

        setInvesting(false);
      },

      "POST",

      {
        ...others,
        wallet,
      },

      token
    );
  };

  return (
    <>
      <Header />

      <ErrorModal errors={errors} />

      <ResponsiveContainer>

        <h2 className="text-center mb-4">
          Reinvest
        </h2>

        {loading ? (
          <div className="text-center mt-5">
            <Spinner />
          </div>
        ) : (
          <>
            <Card className="shadow-sm">

              <Card.Body>

                <Card.Title className="mb-4">
                  Investment Details
                </Card.Title>

                <Label>Plan</Label>

                <Value>
                  {investment.plan}
                </Value>

                <Label>Amount</Label>

                <Value>
                  ${investment.amount}
                </Value>

                <Label>ROI</Label>

                <Value>
                  {roi}%
                </Value>

                <Label>Duration</Label>

                <Value>
                  {duration} Hours
                </Value>

                <Label>Status</Label>

                <Value>
                  {investment.status}
                </Value>

                <Label>Approved Date</Label>

                <Value>
                  {new Date(
                    investment.approvedDate
                  ).toDateString()}
                </Value>

              </Card.Body>

            </Card>

            <Card className="shadow-sm mt-4">

              <Card.Body>

                <Label>
                  Deduct From
                </Label>

                <Form.Select
                  value={wallet}
                  onChange={(e) =>
                    setWallet(e.target.value)
                  }
                >
                  <option value="spot_balance">
                    Spot Balance (${userDetails.balance})
                  </option>

                  <option value="earnings">
                    Earnings (${userDetails.totalEarnings})
                  </option>

                  <option value="referral_bonus">
                    Referral Bonus (${userDetails.referralBonus})
                  </option>
                </Form.Select>

                <div className="mt-3">

                  <small className="text-muted">
                    Available Balance
                  </small>

                  <h5>
                    ${currentBalance}
                  </h5>

                </div>

                <Button
                  variant="success"
                  className="w-100 mt-4"
                  disabled={investing}
                  onClick={reinvest}
                >
                  {investing ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
                      Processing...
                    </>
                  ) : (
                    "Reinvest"
                  )}
                </Button>

              </Card.Body>

            </Card>
          </>
        )}

      </ResponsiveContainer>

      <Footer />
    </>
  );
};

export default ReInvestPage;