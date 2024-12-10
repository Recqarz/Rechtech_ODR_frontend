import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";

const AdminTicket = () => {
  const [ticket, setTickets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ticketIds, setTicketIds] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [editedTicket, setEditedTicket] = useState({
    ticketId: "",
    name: "",
    contactNumber: "",
    email: "",
    category: "",
    date: "",
    query: "",
    status: "",
    closerName: "",
    resolution: "",
  });

  function fetchData() {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/tickets/all-tickets`)
      .then((res) => {
        setTickets(res.data.data);
      })
      .catch((err) => {
        toast.error("Error fetching tickets");
      });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditedTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmitTicket() {
    axios
      .put(
        `${
          import.meta.env.VITE_API_BASEURL
        }/tickets/update-tickets/${ticketIds}`,
        editedTicket
      )
      .then((res) => {
        toast.success("Ticket updated successfully");
        setIsOpen(false);
        fetchData();
      })
      .catch((err) => {
        toast.error("Error updating ticket");
      });
    setEditedTicket({
      ticketId: "",
      name: "",
      contactNumber: "",
      email: "",
      category: "",
      date: "",
      query: "",
      status: "",
      closerName: "",
      resolution: "",
    });
    setTicketIds("");
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleEditTask(ele) {
    setTicketIds(ele._id);
    setEditedTicket({
      ticketId: ele?.ticketId,
      name: ele?.name,
      contactNumber: ele?.contactNumber,
      email: ele?.email,
      category: ele?.category,
      date: ele?.date.split("T")[0],
      query: ele?.query,
      status: ele?.status,
      closerName: ele?.closerName,
      resolution: ele?.resolution,
    });
    setIsOpen(true);
  }

  return (
    <div className="w-full bg-[#012061] min-h-[100vh]">
      <div className="max-w-[1070px] mx-auto bg-[#012061] min-h-[100%] py-3">
        <div className="flex justify-end px-3">
          <div className="relative w-[230px] md:w-[280px] h-[32px] mt-[5px] md:mt-0">
            <Input
              className="w-full h-full  rounded-md placeholder:font-semibold"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoSearch className="absolute top-[25%] right-4 text-lg text-blue-700" />
          </div>
        </div>

        {ticket.length > 0 ? (
          <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
            <div className="grid mt-5  lg:px-3 rounded-md grid-cols-[60px,1fr,50px,60px] md:grid-cols-[60px,1fr,1fr,50px,100px,60px]  lg:grid-cols-[60px,1fr,1fr,1fr,50px,100px,60px] text-sm text-green-500 gap-4 px-2 py-3 shadow-2xl bg-[#0f2d6b]">
              <p className="truncate min-w-[60px]">Ticket Id</p>
              <p className="truncate">Name</p>
              <p className="truncate hidden md:block">Email</p>
              <p className="truncate hidden lg:block">Query</p>
              <p>Status</p>
              <p className="truncate hidden md:block">Date</p>
              <p>Action</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-24 text-white text-2xl font-semibold">
            No Data Available
          </div>
        )}

        <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
          {ticket
            .filter((ele) => {
              if (searchTerm == "") {
                return true;
              }
              return (
                ele.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ele.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ele.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ele.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ele.email.toLowerCase().includes(searchTerm.toLowerCase())
              );
            })
            .map((ele) => {
              return (
                <div
                  key={ele._id}
                  className="grid rounded-md grid-cols-[60px,1fr,50px,60px] md:grid-cols-[60px,1fr,1fr,50px,100px,60px]  lg:grid-cols-[60px,1fr,1fr,1fr,50px,100px,60px] text-sm text-white gap-4 px-2 py-2 shadow-lg bg-[#0f2d6b]"
                >
                  <p className="truncate min-w-[60px]">{ele.ticketId}</p>
                  <p className="truncate">{ele.name}</p>
                  <p className="truncate hidden md:block">{ele.email}</p>
                  <p className="truncate hidden lg:block">{ele.query}</p>
                  <p
                    className={`truncate ${
                      ele.status == "open" ? "text-[#4ac44a]" : "text-red-700"
                    }`}
                  >
                    {ele.status}
                  </p>
                  <p className="truncate hidden md:block">
                    {ele.date.split("T")[0]}
                  </p>
                  <p className="cursor-pointer">
                    <MdEditSquare
                      onClick={() => handleEditTask(ele)}
                      className="text-lg text-[#34c5f5]"
                    />
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[300px] md:max-w-[380px] h-[90vh] overflow-y-auto scrollbar-hide px-4 rounded-md text-white bg-[#0f2d6b] border-none">
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-sm text-white font-normal mt-[-10px]">
            Give solution to the user.
          </DialogDescription>
          <div className="grid gap-2 py-0 mt-[-10px]">
            <div className="grid grid-cols-1 items-center gap-1">
              <Label
                htmlFor="ticketId"
                value={editedTicket.ticketId}
                className="text-sm font-normal"
              >
                Ticket ID
              </Label>
              <Input
                value={editedTicket.ticketId}
                disabled={true}
                id="ticketId"
                name="ticketId"
                className="col-span h-[30px] text-black"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-1">
              <Label htmlFor="name" className="text-sm font-normal">
                Name
              </Label>
              <Input
                disabled={true}
                id="name"
                value={editedTicket.name}
                onChange={handleInputChange}
                className="col-span h-[30px] text-black"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-1">
              <Label htmlFor="contactNumber" className="text-sm font-normal">
                Number
              </Label>
              <Input
                disabled={true}
                id="contactNumber"
                value={editedTicket.contactNumber}
                onChange={handleInputChange}
                className="col-span h-[30px] text-black"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-1">
              <Label htmlFor="email" className="text-sm font-normal">
                Email
              </Label>
              <Input
                disabled={true}
                id="email"
                value={editedTicket.email}
                onChange={handleInputChange}
                className="col-span h-[30px] text-black"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-1">
              <Label htmlFor="category" className="text-sm font-normal">
                Category
              </Label>
              <Input
                disabled={true}
                id="category"
                value={editedTicket.category}
                onChange={handleInputChange}
                className="col-span h-[30px] text-black"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-1">
              <Label htmlFor="query" className="text-sm font-normal">
                Query
              </Label>
              <Input
                disabled={true}
                id="query"
                value={editedTicket.query}
                onChange={handleInputChange}
                className="col-span h-[30px] text-black"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-1">
              <Label htmlFor="status" className="text-sm font-normal">
                Status
              </Label>
              <Select
                value={editedTicket.status}
                onValueChange={(value) =>
                  setEditedTicket((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="col-span w-full h-[30px] text-black">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 items-center gap-1">
              <Label htmlFor="resolution" className="text-sm font-normal">
                Resolution
              </Label>
              <Input
                onChange={handleInputChange}
                id="resolution"
                name="resolution"
                value={editedTicket.resolution}
                className="col-span h-[30px] text-black"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-1">
              <Label htmlFor="closername" className="text-sm font-normal">
                Closer Name
              </Label>
              <Input
                id="closername"
                onChange={handleInputChange}
                name="closerName"
                value={editedTicket.closerName}
                className="col-span h-[30px] text-black"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-1">
              <Label htmlFor="date" className="text-sm font-normal">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                name="date"
                value={editedTicket.date}
                onChange={handleInputChange}
                className="col-span h-[30px] text-black"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmitTicket}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTicket;
