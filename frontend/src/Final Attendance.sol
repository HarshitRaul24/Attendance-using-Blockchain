// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attendance {
    struct AttendanceRecord {
        string subject;
        string date;
        string slot;
        string attendance;
        bool facultyValidate;
        bool hodValidate;
        uint count;
    }

    mapping(uint256 => AttendanceRecord) public attendanceData;
    uint256 public attendanceCount;

    function addAttendance(
        string memory _subject,
        string memory _date,
        string memory _slot,
        string memory _attendance
    ) public {
        attendanceCount++;
        attendanceData[attendanceCount] = AttendanceRecord({
            subject: _subject,
            date: _date,
            slot: _slot,
            attendance: _attendance,
            facultyValidate: false,
            hodValidate: false,
            count: attendanceCount
        });
    }

    function getAllAttendance()
        public
        view
        returns (AttendanceRecord[] memory)
    {
        AttendanceRecord[] memory allAttendance = new AttendanceRecord[](
            attendanceCount
        );
        for (uint256 i = 1; i <= attendanceCount; i++) {
            allAttendance[i - 1] = attendanceData[i];
        }
        return allAttendance;
    }

    function validateByFaculty(uint256 _UniqueId) public {
        attendanceData[_UniqueId].facultyValidate = true;
    }

    function validateByHod(uint256 _UniqueId) public {
        attendanceData[_UniqueId].hodValidate = true;
    }
}
